import { createFetchAction } from '../lib/createActions';
import { buildTableQueryString } from '../lib/utils';

export const FETCH_DISEASE_RIBBON_SUMMARY = 'FETCH_DISEASE_RIBBON_SUMMARY';
export const FETCH_DISEASE_RIBBON_ANNOTATIONS = 'FETCH_DISEASE_RIBBON_ANNOTATIONS';

export const fetchDiseaseRibbonSummary = createFetchAction(
  FETCH_DISEASE_RIBBON_SUMMARY,
  geneIds => {
    const geneIdList = geneIds.map(id => `geneID=${id}`).join('&');
    return`/api/gene/*/disease-ribbon-summary?${geneIdList}`;
  }
);

export const fetchDiseaseRibbonAnnotations = createFetchAction(
  FETCH_DISEASE_RIBBON_ANNOTATIONS,
  (geneIds, termId, options) => {
    const geneParams = geneIds.map(gene => `geneID=${gene}`).join('&');
    const termParam = (termId && termId !== 'all') ? `termID=${termId}&` : '';
    const tableQuery = buildTableQueryString(options);
    return `/api/disease?${termParam}${geneParams}&${tableQuery}`;
  }
);
