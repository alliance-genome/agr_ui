import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import evidenceReferenceIds from './evidenceReferenceIds.js';
import ReferencesCellCuration from '../dataTable/referencesCellCuration.jsx';

const pubmedPage = {
  name: 'reference',
  urlTemplate: 'https://pubmed.ncbi.nlm.nih.gov/[%s]',
};

const makeEvidence = (referenceID, resourceDescriptorPage = pubmedPage) => ({
  type: 'Reference',
  curie: `AGRKB:${referenceID}`,
  referenceID,
  shortCitation: `${referenceID} citation`,
  crossReferences: [
    { referencedCurie: `DOI:10.1000/${referenceID}`, displayName: 'a doi', resourceDescriptorPage: pubmedPage },
    { referencedCurie: referenceID, displayName: referenceID, resourceDescriptorPage },
  ],
});

// the Reference ID cell renders whatever the helper returns, the same way the other tables do
const renderCell = (evidence) => render(<ReferencesCellCuration pubmedPublications={evidenceReferenceIds(evidence)} />);

describe('evidenceReferenceIds', () => {
  it('keeps every evidence entry, not just the first', () => {
    const ids = evidenceReferenceIds([makeEvidence('PMID:1'), makeEvidence('PMID:2'), makeEvidence('PMID:3')]);

    expect(ids.map((xref) => xref.referencedCurie)).toEqual(['PMID:1', 'PMID:2', 'PMID:3']);
  });

  it('picks the cross reference matching referenceID, ignoring the others', () => {
    const [xref] = evidenceReferenceIds([makeEvidence('PMID:1')]);

    expect(xref.referencedCurie).toBe('PMID:1');
    expect(xref.resourceDescriptorPage).toBe(pubmedPage);
  });

  it('falls back to an unlinkable cross reference when none matches referenceID', () => {
    const evidence = makeEvidence('PMID:1');
    evidence.crossReferences = [{ referencedCurie: 'DOI:10.1000/other', resourceDescriptorPage: pubmedPage }];

    expect(evidenceReferenceIds([evidence])).toEqual([{ referencedCurie: 'PMID:1' }]);
  });

  it('drops evidence entries with no referenceID and tolerates empty input', () => {
    expect(evidenceReferenceIds([{ curie: 'AGRKB:1' }])).toEqual([]);
    expect(evidenceReferenceIds([])).toEqual([]);
    expect(evidenceReferenceIds(undefined)).toEqual([]);
  });
});

describe('the Reference ID cell', () => {
  it('links every reference of a multi-evidence interaction', () => {
    renderCell([makeEvidence('PMID:1'), makeEvidence('PMID:2')]);

    expect(screen.getByTitle('PMID:1')).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/1');
    expect(screen.getByTitle('PMID:2')).toHaveAttribute('href', 'https://pubmed.ncbi.nlm.nih.gov/2');
  });

  it('collapses past two references behind a Show All toggle', () => {
    renderCell([makeEvidence('PMID:1'), makeEvidence('PMID:2'), makeEvidence('PMID:3')]);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /Show All 3/ })).toBeInTheDocument();
  });

  it('renders a single-evidence interaction as one link, unchanged', () => {
    renderCell([makeEvidence('PMID:1')]);

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders an id with no url as plain text', () => {
    renderCell([makeEvidence('FB:FBrf0068180', null)]);

    expect(screen.getByTitle('FB:FBrf0068180')).not.toHaveAttribute('href');
  });

  it('renders nothing when there is no evidence', () => {
    const { container } = renderCell([]);

    expect(container).toBeEmptyDOMElement();
  });
});
