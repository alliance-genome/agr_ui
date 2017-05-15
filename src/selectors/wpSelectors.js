import { createSelector } from 'reselect';

export const selectWpDomain = (state) => state.wp;

export const selectWp = createSelector(
  [selectWpDomain],
  (wp) => wp.toJS()
);
