import useDataTableQuery from './useDataTableQuery';
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
    focusTaxonId: focusTaxonId,
    geneID: geneIds,
  };
  if (termId && termId !== 'all') {
    params.termID = termId;
  }
  const queryString = qs.stringify(params, {
    addQueryPrefix: true,
    arrayFormat: 'repeat',
  });

  const downloadUrl = `${baseUrl}/download${queryString}`;

  const query = useDataTableQuery(
    baseUrl + queryString,
    {
      enabled: orthologGenes !== null,
    }
  );

  return {
    ...query,
    downloadUrl,
  };
}
