import { createFetchAction } from '../lib/createActions';

export const FETCH_DISEASE_RIBBON_SUMMARY = 'FETCH_DISEASE_RIBBON_SUMMARY';
export const FETCH_DISEASE_RIBBON_ANNOTATIONS = 'FETCH_DISEASE_RIBBON_ANNOTATIONS';

export const fetchDiseaseRibbonSummary = createFetchAction(
  FETCH_DISEASE_RIBBON_SUMMARY,
  geneIds => {
    const geneIdList = geneIds.map(id => `geneID=${id}`).join('&');
    return`/api/gene/*/disease-ribbon-summary?${geneIdList}`;
  }
);
