import { useQuery } from '@tanstack/react-query';
import fetchAllPages from '../lib/fetchAllPages';
import { buildTableQueryString } from '../lib/utils';
import { ISOFORM_ONLY_TAXA } from '../constants';

export function usesVariantViewer(taxonId) {
  return Boolean(taxonId) && !ISOFORM_ONLY_TAXA.has(taxonId);
}

export function getViewerAlleleIdsUrl(geneId, tableState) {
  const queryParams = new URLSearchParams(buildTableQueryString({ filters: tableState?.filters }));
  for (const parameter of [...queryParams.keys()]) {
    if (!parameter.startsWith('filter.')) {
      queryParams.delete(parameter);
    }
  }
  const filterQuery = queryParams.toString();
  const suffix = filterQuery ? `?${filterQuery}` : '';
  return `/api/gene/${geneId}/allele-viewer-ids${suffix}`;
}

export function getVisibleViewerAlleleIds(response, selectionOverride) {
  return selectionOverride.active ? selectionOverride.alleleIds : response?.results || [];
}

export function hasViewerContent(taxonId, hasAlleles, response) {
  if (!usesVariantViewer(taxonId)) {
    return hasAlleles;
  }
  return Boolean(response?.results?.length) || response?.supplementalData?.hasStandaloneVariants === true;
}

export default function useViewerAlleleIds(geneId, taxonId, tableState) {
  const url = getViewerAlleleIdsUrl(geneId, tableState);

  return useQuery({
    queryKey: ['gene-allele-viewer-ids', geneId, url],
    queryFn: () => fetchAllPages(url),
    enabled: Boolean(geneId) && usesVariantViewer(taxonId),
    placeholderData: (previousData, previousQuery) =>
      previousQuery?.queryKey[1] === geneId ? previousData : undefined,
  });
}
