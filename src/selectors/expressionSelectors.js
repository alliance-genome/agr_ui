import { createSelector } from 'reselect';

export const selectExpressionDomain = (state) => state.expression;

export const selectSummary = geneId => {
  return createSelector(
    [selectExpressionDomain],
    expression => {
      console.log('expr selector: ' , expression);
      const summary = expression.get('summaries').get(geneId);
      if (!summary) {
        return undefined;
      }
      return summary.toJS();
    }
  );
};

export const selectAnnotations = createSelector(
  [selectExpressionDomain],
  expression => expression.get('annotations').toJS()
);
