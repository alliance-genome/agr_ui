import GeneOntologyRibbonWithNavigate from './index.jsx';
import { AnnotationRibbonTable } from '../../../node_modules/@geneontology/web-components/dist/collection/components/annotation-ribbon-table/annotation-ribbon-table.js';

jest.mock('react-router-dom', () => ({ useNavigate: () => jest.fn() }));
jest.mock('../OrthologPicker.jsx', () => () => null);
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

async function displayTable(assocs, { onlyEXP = false, groupId = 'GO:0003824' } = {}) {
  const element = GeneOntologyRibbonWithNavigate({ geneId: 'HGNC:5320' });
  const ribbon = new element.type(element.props);
  ribbon.state.selected.group = { id: groupId };
  ribbon.state.onlyEXP = onlyEXP;
  const { props } = ribbon.renderRibbonTable();
  const table = new AnnotationRibbonTable();
  table.groupBy = props['group-by'];
  table.orderBy = props['order-by'];
  table.hideColumns = props['hide-columns'];
  table.filterBy = props['filter-by'];
  await table.setData([{ subject: 'HGNC:5320', assocs }]);
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
