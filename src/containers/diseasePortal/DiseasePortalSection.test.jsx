import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import DiseasePortalSection from './DiseasePortalSection.jsx';
import { useEntityButtonCounts } from './useEntityButtonCounts.js';

jest.mock('./useEntityButtonCounts.js', () => ({ useEntityButtonCounts: jest.fn() }));

// a non-root portal, so the Species pill stays out of the way
const disease = { doid: 'DOID:2843', pageName: 'Long QT Syndrome' };

const renderSection = () =>
  render(
    <MemoryRouter>
      <DiseasePortalSection disease={disease} />
    </MemoryRouter>
  );

const pillText = (id) => document.querySelector(`a#entity-${id}`)?.textContent;

describe('DiseasePortalSection counts', () => {
  afterEach(() => useEntityButtonCounts.mockReset());

  it('renders a real zero as "0" rather than a blank number', () => {
    useEntityButtonCounts.mockReturnValue(0);
    renderSection();

    // the regression: 0 is falsy, so a truthiness guard printed nothing here
    expect(pillText('genes')).toBe('0Genes');
    expect(pillText('alleles')).toBe('0Alleles');
    expect(pillText('models')).toBe('0Models');
  });

  it('renders no number while the counts are still loading', () => {
    useEntityButtonCounts.mockReturnValue(undefined);
    renderSection();

    expect(pillText('genes')).toBe('Genes');
    expect(pillText('alleles')).toBe('Alleles');
    expect(pillText('models')).toBe('Models');
    expect(screen.queryByText('false')).not.toBeInTheDocument();
  });

  it('still thousands-separates a populated count', () => {
    useEntityButtonCounts.mockReturnValue(4167);
    renderSection();

    expect(pillText('genes')).toBe('4,167Genes');
  });
});
