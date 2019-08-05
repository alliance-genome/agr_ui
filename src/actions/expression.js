import { buildTableQueryString } from '../lib/utils';
import { createFetchAction } from '../lib/createActions';

export const FETCH_EXPRESSION_RIBBON_SUMMARY = 'FETCH_EXPRESSION_RIBBON_SUMMARY';
export const FETCH_EXPRESSION_ANNOTATIONS = 'FETCH_EXPRESSION_ANNOTATIONS';

export const fetchExpressionRibbonSummary = createFetchAction(
  FETCH_EXPRESSION_RIBBON_SUMMARY,
  geneIds => {
    const geneIdList = geneIds.map(id => `geneID=${id}`).join('&');
    return`/api/expression/ribbon-summary?${geneIdList}`;
  }
);

export const fetchExpressionAnnotations = createFetchAction(
  FETCH_EXPRESSION_ANNOTATIONS,
  (geneIds, termId, options) => {
    const geneParams = geneIds.map(gene => `geneID=${gene}`).join('&');
    const termParam = (termId && termId !== 'all') ? `termID=${termId}&` : '';
    const tableQuery = buildTableQueryString(options);
    return `/api/expression?${termParam}${geneParams}&${tableQuery}`;
  }
);
