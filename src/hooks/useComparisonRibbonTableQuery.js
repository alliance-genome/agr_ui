import useDataTableQuery from './useDataTableQuery';
import { getOrthologId } from '../components/orthology';

export default function useComparisonRibbonTableQuery(baseUrl, focusGeneId, orthologGenes, termId) {
  const geneIds = [focusGeneId];
  if (orthologGenes) {
    geneIds.push(...orthologGenes.map(getOrthologId));
  }
  const geneParams = geneIds.map(gene => `geneID=${gene}`).join('&');
  const termParam = (termId && termId !== 'all') ? `termID=${termId}&` : '';

  const downloadUrl = `${baseUrl}/download?${termParam}${geneParams}`;

  const query = useDataTableQuery(
    `${baseUrl}?${termParam}${geneParams}`,
    {
      enabled: orthologGenes !== null,
    }
  );

  return {
    ...query,
    downloadUrl,
  };
}
