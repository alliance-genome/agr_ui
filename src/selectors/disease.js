import { createSelector } from 'reselect';

export const selectDiseaseDomain = (state) => state.disease;

export const selectDisease = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.toJS()
);
