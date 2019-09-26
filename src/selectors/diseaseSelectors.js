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

export const selectGeneAssociations = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('geneAssociations').toJS()
);

export const selectAlleleAssociations = createSelector(
  [selectDiseaseDomain],
  disease => disease.get('alleleAssociations').toJS()
);

export const selectModelAssociations = createSelector(
  [selectDiseaseDomain],
  disease => disease.get('modelAssociations').toJS()
);
