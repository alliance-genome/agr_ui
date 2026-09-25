import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import GeneOntologyRibbonWithNavigate from './index.jsx';
import fetchData from '../../lib/fetchData';
import { AnnotationRibbonTable } from '../../../node_modules/@geneontology/web-components/dist/collection/components/annotation-ribbon-table/annotation-ribbon-table.js';

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }));
jest.mock('../../lib/fetchData', () => jest.fn());
// Report no orthologs on mount so the ribbon summary loads, as the real picker does.
jest.mock('../OrthologPicker.jsx', () => {
  const { useEffect } = jest.requireActual('react');
  return ({ onChange }) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => onChange([]), []);
    return null;
  };
});
// Exercise the installed component's real data conversion, grouping and filtering without network or Stencil rendering.
jest.mock('@stencil/core', () => ({ h: jest.fn() }), { virtual: true });
jest.mock('@geneontology/dbxrefs', () => ({ getURL: (prefix, _, id) => `https://example.org/${prefix}/${id}` }), {
  virtual: true,
});
jest.mock('../../../node_modules/@geneontology/web-components/dist/collection/globals/api.js', () => ({}));

const association = (negated, evidence, reference) => ({
  subject: { id: 'HGNC:5320', label: 'HYAL1' },
  object: { id: 'GO:0004415', label: 'hyalurononglucosaminidase activity', category: ['molecular_function'] },
  negated,
  ...(negated ? { qualifiers: ['not'] } : {}),
  evidence: 'ECO:0000314',
  evidence_type: evidence,
  reference: [reference],
});

const values = (row, column) => row.cells.find((cell) => cell.headerId === column).values;
const labels = (row, column) =>
  values(row, column)
    .map((cell) => cell.label)
    .filter(Boolean);

// Stand-ins for the GO web components; the table records the data the ribbon pushes into it.
const tableSetData = jest.fn();
customElements.define(
  'go-annotation-ribbon-strips',
  class extends HTMLElement {
    setData() {}
  }
);
customElements.define(
  'go-annotation-ribbon-table',
  class extends HTMLElement {
    setData(data) {
      tableSetData(data);
    }
  }
);

const summary = {
  categories: [{ id: 'GO:0003674', label: 'molecular_function', groups: [{ id: 'GO:0003824', type: 'Term' }] }],
  subjects: [{ id: 'HGNC:5320', label: 'HYAL1', groups: {} }],
};

beforeEach(() => tableSetData.mockClear());

async function displayTable(assocs, { onlyEXP = false, groupId = 'GO:0003824' } = {}) {
  fetchData.mockImplementation((url) =>
    Promise.resolve(url.includes('ontology/ribbon') ? summary : [{ subject: 'HGNC:5320', assocs }])
  );
  const { container } = render(
    <GeneOntologyRibbonWithNavigate geneId="HGNC:5320" geneSpecies={{ taxonId: 'NCBITaxon:9606' }} />
  );
  const ribbon = await waitFor(() => {
    const el = container.querySelector('#go-ribbon');
    if (!el) throw new Error('ribbon not rendered');
    return el;
  });
  if (onlyEXP) {
    fireEvent.click(screen.getByRole('checkbox'));
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked());
  }
  act(() => {
    ribbon.dispatchEvent(
      new CustomEvent('cellClick', {
        detail: { subjects: [summary.subjects[0]], group: { id: groupId, type: 'Term' } },
      })
    );
  });
  await waitFor(() => expect(tableSetData).toHaveBeenCalled());

  // Run the real table component with the attributes and data the ribbon rendered.
  const element = container.querySelector('go-annotation-ribbon-table');
  const table = new AnnotationRibbonTable();
  table.groupBy = element.getAttribute('group-by');
  table.orderBy = element.getAttribute('order-by');
  table.hideColumns = element.getAttribute('hide-columns');
  table.filterBy = element.getAttribute('filter-by');
  await table.setData(tableSetData.mock.calls.at(-1)[0]);
  return table.displayTable;
}

it.each([false, true])(
  'keeps positive and NOT evidence and references separate (negative first: %s)',
  async (negativeFirst) => {
    const positive = association(false, 'IEA', 'GO_REF:0000002');
    const negative = association(true, 'IDA', 'PMID:12084718');
    const assocs = negativeFirst ? [negative, positive] : [positive, negative];
    assocs.push(association(false, 'IDA', 'PMID:11296287'));
    const table = await displayTable(assocs);

    expect(table.rows).toHaveLength(2);
    const positiveRow = table.rows.find((row) => labels(row, 'qualifier').length === 0);
    const negativeRow = table.rows.find((row) => labels(row, 'qualifier').includes('not'));
    expect(values(positiveRow, 'term')[0].tags).toBeUndefined();
    expect(labels(positiveRow, 'evidence')).toEqual(['IEA', 'IDA']);
    expect(labels(positiveRow, 'reference')).toEqual(['GO_REF:0000002', 'PMID:11296287']);
    expect(values(negativeRow, 'term')[0].tags).toEqual(['not']);
    expect(labels(negativeRow, 'evidence')).toEqual(['IDA']);
    expect(labels(negativeRow, 'reference')).toEqual(['PMID:12084718']);
  }
);

it('keeps experimental filtering from retaining a non-experimental annotation of the opposite qualifier', async () => {
  const table = await displayTable(
    [association(false, 'IEA', 'GO_REF:0000002'), association(true, 'IDA', 'PMID:12084718')],
    { onlyEXP: true }
  );
  expect(table.rows).toHaveLength(1);
  expect(labels(table.rows[0], 'qualifier')).toEqual(['not']);
  expect(labels(table.rows[0], 'reference')).toEqual(['PMID:12084718']);
});

it('separates qualifiers in the all-annotations view while showing the aspect column', async () => {
  const table = await displayTable(
    [association(true, 'IDA', 'PMID:12084718'), association(false, 'IDA', 'PMID:11296287')],
    { groupId: 'all' }
  );
  expect(table.rows).toHaveLength(2);
  expect(table.header.find((column) => column.id === 'aspect').hide).toBe(false);
});
