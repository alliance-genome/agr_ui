import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import ReferenceList from './referenceList.jsx';

const agrkbRef = (n) => ({
  type: 'Reference',
  curie: `AGRKB:10100000000000${n}`,
  shortCitation: `Author ${n} (200${n}) J Test 1(1):1-2`,
});

// Orphanet evidence as the API returns it: no citation, and a curie with no Alliance page
const orphaRef = (n) => ({
  type: 'ExternalDatabaseReference',
  curie: `ORPHA:${n}`,
});

const renderList = (refs, props = {}) =>
  render(
    <MemoryRouter>
      <ReferenceList refs={refs} {...props} />
    </MemoryRouter>
  );

describe('ReferenceList', () => {
  it('links a reference that has an AGRKB curie and a citation', () => {
    renderList([agrkbRef(1)]);

    const link = screen.getByTitle('Author 1 (2001) J Test 1(1):1-2');
    expect(link).toHaveAttribute('href', '/reference/AGRKB:101000000000001');
    expect(link).toHaveTextContent('Author 1 (2001) J Test 1(1):1-2');
  });

  it('renders nothing when every reference is uncited Orphanet evidence', () => {
    const { container } = renderList([orphaRef(96253), orphaRef(1333)]);

    expect(container).toBeEmptyDOMElement();
  });

  it('drops uncited references but keeps the cited ones alongside them', () => {
    renderList([orphaRef(96253), agrkbRef(1), orphaRef(1333)]);

    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(screen.getByTitle('Author 1 (2001) J Test 1(1):1-2')).toBeInTheDocument();
  });

  it('never emits a link to a reference page for a non-AGRKB curie', () => {
    renderList([{ type: 'ExternalDatabaseReference', curie: 'OMIM:151623', shortCitation: 'OMIM entry 151623' }]);

    const cell = screen.getByTitle('OMIM entry 151623');
    expect(cell).toHaveTextContent('OMIM entry 151623');
    expect(cell).not.toHaveAttribute('href');
    expect(document.querySelector('a')).toBeNull();
  });

  it('renders nothing for empty or missing input', () => {
    expect(renderList([]).container).toBeEmptyDOMElement();
    expect(renderList(undefined).container).toBeEmptyDOMElement();
  });

  it('collapses past two cited references behind a Show All toggle', () => {
    renderList([agrkbRef(1), agrkbRef(2), agrkbRef(3)]);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByRole('button', { name: /Show All 3/ })).toBeInTheDocument();
  });

  it('counts only cited references in the Show All total', () => {
    renderList([agrkbRef(1), agrkbRef(2), agrkbRef(3), orphaRef(96253), orphaRef(1333)]);

    expect(screen.getByRole('button', { name: /Show All 3/ })).toBeInTheDocument();
  });

  it('dims references that do not match an active filter term', () => {
    renderList([agrkbRef(1), agrkbRef(2)], { filterTerm: 'Author 1' });

    expect(screen.getByTitle('Author 1 (2001) J Test 1(1):1-2').className).not.toMatch(/referenceDim/);
    expect(screen.getByTitle('Author 2 (2002) J Test 1(1):1-2').className).toMatch(/referenceDim/);
  });
});
