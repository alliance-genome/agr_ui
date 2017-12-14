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
  (disease) => disease.get('associations')
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

export const selectAssociationsError = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('associationsError')
);

export const selectTotalPages = createSelector(
  [selectTotalAssociations, selectPerPageSize],
  (numAssoc, numPerPage) => Math.ceil(numAssoc / numPerPage)
);

export const selectSortName = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('sortName')
);

export const selectSortOrder = createSelector(
  [selectDiseaseDomain],
  (disease) => disease.get('sortOrder')
);
