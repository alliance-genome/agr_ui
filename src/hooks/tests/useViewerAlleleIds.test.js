import { useQuery } from '@tanstack/react-query';
import fetchAllPages from '../../lib/fetchAllPages';
import useViewerAlleleIds, {
  getViewerAlleleIdsUrl,
  getVisibleViewerAlleleIds,
  hasViewerContent,
} from '../useViewerAlleleIds';

jest.mock('@tanstack/react-query', () => ({ useQuery: jest.fn((config) => config) }));
jest.mock('../../lib/fetchAllPages', () => jest.fn());

describe('useViewerAlleleIds', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useQuery.mockImplementation((config) => config);
  });

  test.each(['NCBITaxon:9606', 'NCBITaxon:559292'])('does not enable viewer requests for %s', (taxonId) => {
    const query = useViewerAlleleIds('HGNC:11998', taxonId, {});

    expect(query.enabled).toBe(false);
    expect(fetchAllPages).not.toHaveBeenCalled();
  });

  test('enables one bounded complete query for a variant-capable taxon', async () => {
    const tableState = {
      filters: { alleleSymbol: { filterVal: 'pax2a' } },
      page: 7,
      sizePerPage: 50,
      sort: 'variantType',
    };
    const query = useViewerAlleleIds('ZFIN:ZDB-GENE-030113-2', 'NCBITaxon:7955', tableState);

    expect(query.enabled).toBe(true);
    expect(query.queryKey).toEqual([
      'gene-allele-viewer-ids',
      'ZFIN:ZDB-GENE-030113-2',
      '/api/gene/ZFIN:ZDB-GENE-030113-2/allele-viewer-ids?filter.alleleSymbol=pax2a',
    ]);

    await query.queryFn();
    expect(fetchAllPages).toHaveBeenCalledWith(
      '/api/gene/ZFIN:ZDB-GENE-030113-2/allele-viewer-ids?filter.alleleSymbol=pax2a'
    );
  });

  test('paging, page size, and sorting do not change the viewer URL', () => {
    const filters = { variantType: { filterVal: ['SNV', 'deletion'] } };

    expect(getViewerAlleleIdsUrl('MGI:1', { filters, page: 1, sizePerPage: 10, sort: 'alleleSymbol' })).toBe(
      getViewerAlleleIdsUrl('MGI:1', { filters, page: 9, sizePerPage: 100, sort: 'variantType' })
    );
  });

  test('keeps filter delimiters encoded in the viewer URL', () => {
    const filters = { alleleSymbol: { filterVal: 'a&b=c' } };

    expect(getViewerAlleleIdsUrl('MGI:1', { filters })).toBe(
      '/api/gene/MGI:1/allele-viewer-ids?filter.alleleSymbol=a%26b%3Dc'
    );
  });

  test('keeps selected IDs visible while selected-row details are loading', () => {
    expect(getVisibleViewerAlleleIds({ results: ['MGI:1', 'MGI:2'] }, { active: true, alleleIds: ['MGI:2'] })).toEqual([
      'MGI:2',
    ]);
  });

  test('keeps viewer mounting independent from selection details', () => {
    expect(hasViewerContent('NCBITaxon:7955', true, { results: ['ZFIN:1'] })).toBe(true);
    expect(
      hasViewerContent('NCBITaxon:10116', true, {
        results: [],
        supplementalData: { hasStandaloneVariants: true },
      })
    ).toBe(true);
    expect(
      hasViewerContent('NCBITaxon:10116', true, {
        results: [],
        supplementalData: { hasStandaloneVariants: false },
      })
    ).toBe(false);
    expect(hasViewerContent('NCBITaxon:9606', true, undefined)).toBe(true);
    expect(hasViewerContent('NCBITaxon:9606', false, undefined)).toBe(false);
  });

  test('retains placeholder IDs only while refetching the same gene', () => {
    const query = useViewerAlleleIds('MGI:1', 'NCBITaxon:10090', {});
    const previousData = { results: ['MGI:2'] };

    expect(query.placeholderData(previousData, { queryKey: ['gene-allele-viewer-ids', 'MGI:1'] })).toBe(previousData);
    expect(query.placeholderData(previousData, { queryKey: ['gene-allele-viewer-ids', 'MGI:3'] })).toBeUndefined();
  });
});
