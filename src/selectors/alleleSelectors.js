import { createSelector } from 'reselect';

export const selectAlleleDomain = (state) => state.allele;

export const selectData = createSelector(
  [selectAlleleDomain],
  allele => allele.get('data')
);

export const selectLoading = createSelector(
  [selectAlleleDomain],
  allele => allele.get('loading')
);

export const selectError = createSelector(
  [selectAlleleDomain],
  allele => allele.get('error')
);

export const selectPhenotypes = createSelector(
  [selectAlleleDomain],
  allele => allele.get('phenotypes').toJS()
);

export const selectDiseaseAssociations = createSelector(
  [selectAlleleDomain],
  allele => allele.get('diseaseAssociations').toJS()
);

export const selectVariants = createSelector(
  [selectAlleleDomain],
  allele => allele.get('variants').toJS()
);
