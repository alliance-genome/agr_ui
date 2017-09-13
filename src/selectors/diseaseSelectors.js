import { createSelector } from 'reselect';

export const selectDiseaseDomain = (state) => state.disease;

export const selectDisease = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.toJS()
);

export const selectData = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('data').toJS()
);

export const selectAssociations = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('associations').toJS()
);

export const selectCurrentPage = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('currentPage')
);

export const selectPerPageSize = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('perPageSize')
);

export const selectTotalAssociations = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('totalAssociations')
);

export const selectLoadingAssociation = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('loadingAssociations')
);

export const selectAssocationsError = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('associationsError')
);
