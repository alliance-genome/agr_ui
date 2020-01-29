import { createSelector } from 'reselect';

export const selectAlleleDomain = (state) => state.allele;

export const selectData = createSelector(
  [selectAlleleDomain],
  (disease) => disease.get('data')
);

export const selectLoading = createSelector(
  [selectAlleleDomain],
  (disease) => disease.get('loading')
);

export const selectError = createSelector(
  [selectAlleleDomain],
  (disease) => disease.get('error')
);

export const selectDiseaseAssociations = createSelector(
  [selectAlleleDomain],
  allele => allele.get('diseaseAssociations').toJS()
);
