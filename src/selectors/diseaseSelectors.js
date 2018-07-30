import { createSelector } from 'reselect';

export const selectDiseaseDomain = (state) => state.disease;

export const selectData = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('data')
);

export const selectLoading = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('loading')
);

export const selectError = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('error')
);

export const selectAssociations = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('associations').toJS()
);
