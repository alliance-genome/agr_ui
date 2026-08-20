import { useQuery } from '@tanstack/react-query';
import fetchAllPages from '../lib/fetchAllPages';
import { buildTableQueryString } from '../lib/utils';

export const ISOFORM_ONLY_TAXA = new Set(['NCBITaxon:9606', 'NCBITaxon:559292']);

export function usesVariantViewer(taxonId) {
  return Boolean(taxonId) && !ISOFORM_ONLY_TAXA.has(taxonId);
}

export function getViewerAlleleIdsUrl(geneId, tableState) {
  const filterQuery = buildTableQueryString({ filters: tableState?.filters })
    .split('&')
    .filter((parameter) => parameter.startsWith('filter.'))
    .join('&');
  const suffix = filterQuery ? `?${filterQuery}` : '';
  return `/api/gene/${geneId}/allele-viewer-ids${suffix}`;
}

export function getVisibleViewerAlleleIds(response, selectionOverride) {
  return selectionOverride.active ? selectionOverride.alleleIds : response?.results || [];
}

export function hasViewerContent(taxonId, hasAlleles, response) {
  return usesVariantViewer(taxonId) ? Boolean(response?.results?.length) : hasAlleles;
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
