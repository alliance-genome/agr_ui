import { createSelector } from 'reselect';

export const selectExpressionDomain = (state) => state.expression;

export const selectExpressionRibbonSummary = createSelector(
  [selectExpressionDomain],
  expression => expression.get('summary').toJS()
);

export const selectAnnotations = createSelector(
  [selectExpressionDomain],
  expression => expression.get('annotations').toJS()
);
