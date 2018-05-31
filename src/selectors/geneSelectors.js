import { createSelector } from 'reselect';

export const selectGeneDomain = (state) => state.gene;

export const selectGene = createSelector(
  [selectGeneDomain],
  (gene) => gene.toJS()
);

export const selectAlleles = createSelector(
  [selectGeneDomain],
  (gene) => gene.get('alleles').toJS()
);
