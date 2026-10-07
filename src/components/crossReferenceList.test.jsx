import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CrossReferenceList from './crossReferenceList.jsx';

const makeReferences = () => [
  { name: 'Zebra', url: 'http://example.org/zebra' },
  { name: 'apple' },
  { name: 'Mango', url: 'http://example.org/mango' },
];

const renderedNames = () => screen.getAllByRole('listitem').map((item) => item.textContent);

describe('CrossReferenceList', () => {
  it('sorts linked references first, then alphabetically case-insensitively', () => {
    render(<CrossReferenceList collapsible={false} crossReferences={makeReferences()} />);

    expect(renderedNames()).toEqual(['Mango', 'Zebra', 'apple']);
  });

  it('does not mutate the crossReferences prop', () => {
    const references = makeReferences();
    const originalOrder = [...references];

    render(<CrossReferenceList collapsible={false} crossReferences={references} />);

    expect(references).toEqual(originalOrder);
  });

  it('preserves the given order when sort is disabled', () => {
    render(<CrossReferenceList collapsible={false} crossReferences={makeReferences()} sort={false} />);

    expect(renderedNames()).toEqual(['Zebra', 'apple', 'Mango']);
  });
});
