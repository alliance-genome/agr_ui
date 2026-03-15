import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import GeneAlleleDetailsTable from '../GeneAlleleDetailsTable.jsx';

let mockAllelesFilteredResults = [];
const mockViewerMountSpy = jest.fn();

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: {
      results: mockAllelesFilteredResults,
    },
  })),
}));

jest.mock('../../../hooks/useDataTableQuery', () =>
  jest.fn(() => ({
    isLoading: false,
    supplementalData: {},
    data: [],
    tableState: {
      filters: {},
      page: 1,
      sizePerPage: 25,
    },
    setTableState: jest.fn(),
    totalRows: 0,
    isError: false,
    isIdle: false,
    isFetching: false,
    error: null,
  }))
);

jest.mock('../../../components/dataTable', () => ({
  BooleanLinkCell: () => null,
  DataTable: () => null,
  GeneCell: () => null,
  VEPTextCell: () => null,
}));

jest.mock('../../../components/dataTable/utils.jsx', () => ({
  getDistinctFieldValue: jest.fn(() => []),
}));

jest.mock('../../../components/dataTable/AlleleCellCuration.jsx', () => () => null);
jest.mock('../../../components/synonymList.jsx', () => () => null);
jest.mock('../../../components/noData.jsx', () => ({ children }) => <div>{children}</div>);
jest.mock('../../../components/variant/VariantJBrowseLink.jsx', () => ({ children }) => <>{children}</>);
jest.mock('../../../components/errorBoundary.jsx', () => ({ children }) => <>{children}</>);
jest.mock('../../../lib/fetchData', () => jest.fn());

jest.mock('../../../lib/utils', () => ({
  getGenomicLocations: jest.fn(() => [{ chromosome: '1', start: 10, end: 20, strand: '+' }]),
  getSingleGenomeLocation: jest.fn(() => ({ chromosome: '1', start: 10, end: 20, strand: '+' })),
  findFminFmax: jest.fn(() => ({ fmin: 10, fmax: 20 })),
  getTableUrl: jest.fn(() => '/mock-url'),
}));

jest.mock('../../genePage/VariantsSequenceViewer.jsx', () => {
  const React = require('react');
  return function MockVariantsSequenceViewer({ allelesVisible }) {
    React.useEffect(() => {
      mockViewerMountSpy(allelesVisible.map((allele) => allele.id));
    }, []);
    return <div data-testid="variants-sequence-viewer">{allelesVisible.map((allele) => allele.id).join(',')}</div>;
  };
});

describe('GeneAlleleDetailsTable', () => {
  const gene = {
    geneSymbol: { displayText: 'TestGene' },
    taxon: { name: 'Mus musculus', curie: 'NCBITaxon:10090' },
    geneType: { name: 'protein_coding_gene' },
  };

  beforeEach(() => {
    mockAllelesFilteredResults = [];
    mockViewerMountSpy.mockClear();
  });

  test('remounts the viewer when the visible variant set changes within the same allele', async () => {
    mockAllelesFilteredResults = [
      {
        allele: { primaryExternalId: 'MGI:1' },
        variant: {
          curatedVariantGenomicLocations: [
            {
              hgvs: 'NC_000001.1:g.11A>T',
              start: 11,
              end: 12,
              variantGenomicLocationAssociationObject: { name: '1' },
            },
          ],
        },
      },
    ];

    const { rerender } = render(<GeneAlleleDetailsTable gene={gene} geneId="MGI:gene1" isLoadingGene={false} />);

    await waitFor(() => {
      expect(mockViewerMountSpy).toHaveBeenCalledTimes(1);
    });
    expect(mockViewerMountSpy).toHaveBeenLastCalledWith(['NC_000001.1:g.11A>T']);

    mockAllelesFilteredResults = [
      {
        allele: { primaryExternalId: 'MGI:1' },
        variant: {
          curatedVariantGenomicLocations: [
            {
              hgvs: 'NC_000001.1:g.15G>C',
              start: 15,
              end: 16,
              variantGenomicLocationAssociationObject: { name: '1' },
            },
          ],
        },
      },
    ];

    rerender(<GeneAlleleDetailsTable gene={gene} geneId="MGI:gene1" isLoadingGene={false} />);

    await waitFor(() => {
      expect(mockViewerMountSpy).toHaveBeenCalledTimes(2);
    });
    expect(mockViewerMountSpy).toHaveBeenLastCalledWith(['NC_000001.1:g.15G>C']);
  });
});
