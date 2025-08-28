import usePostDataTableQuery from './usePostDataTableQuery';
import { getOrthologId } from '../components/orthology';
import qs from 'qs';

export default function useComparisonRibbonTableQuery(
  baseUrl,
  focusGeneId,
  focusTaxonId,
  orthologGenes,
  termId,
  additionalQueryParams
) {
  const geneIds = [focusGeneId];
  if (orthologGenes) {
    geneIds.push(...orthologGenes.map(getOrthologId));
  }
  const params = {
    ...additionalQueryParams,
    // geneIds: orthologGenes,
    // focusGeneId: focusGeneId,
    focusTaxonId: focusTaxonId,
  };
  if (termId && termId !== 'all') {
    params.termID = termId;
  }

  const queryString = qs.stringify(params, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  });

  const downloadUrl = `${baseUrl}/download${queryString}`;

  const query = usePostDataTableQuery(
    baseUrl + queryString,
    geneIds,
    {
      enabled: orthologGenes !== null,
    },
    null,
    90_000
  );

  return {
    ...query,
    downloadUrl,
    downloadBody: geneIds,
  };
}
