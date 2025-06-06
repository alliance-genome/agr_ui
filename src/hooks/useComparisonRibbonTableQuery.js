import usePostDataTableQuery from './usePostDataTableQuery';
import { getOrthologId } from '../components/orthology';
import qs from 'qs';

export default function useComparisonRibbonTableQuery(
  baseUrl,
  focusGeneId,
  focusTaxonId,
  orthologGenes,
  termId,
  additionalQueryParams,
  downloadUrl
) {
  const geneIds = [focusGeneId];
  if (orthologGenes) {
    geneIds.push(...orthologGenes.map(getOrthologId));
  }
  const params = {
    ...additionalQueryParams,
    focusTaxonId: focusTaxonId,
  };
  if (termId && termId !== 'all') {
    params.termID = termId;
  }
  
  const queryString = qs.stringify(params, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  });

  const defaultDownloadUrl = downloadUrl ? `${downloadUrl}${queryString}` : `${baseUrl}/download${queryString}`;
  
  const query = usePostDataTableQuery(
    baseUrl + queryString,
    geneIds,
    {
      enabled: orthologGenes !== null,
    },
    null,
    90_000,
  );

  return {
    ...query,
    defaultDownloadUrl,
    downloadBody: geneIds,
  };
}
