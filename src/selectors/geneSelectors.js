import { createSelector } from 'reselect';

export const selectGeneDomain = (state) => state.gene;

export const selectGene = createSelector(
  [selectGeneDomain],
  (gene) => gene.toJS()
);

export const selectOrthologs = createSelector(
  [selectGeneDomain],
  (gene) => gene.get('orthologs').toJS()
);

export const selectOrthologsWithExpression = createSelector(
  [selectGeneDomain],
  (gene) => gene.get('orthologsWithExpression').toJS()
);

export const selectAlleles = createSelector(
  [selectGeneDomain],
  (gene) => gene.get('alleles').toJS()
);

export const selectPhenotypes = createSelector(
  [selectGeneDomain],
  (gene) => gene.get('phenotypes').toJS()
);

export const selectDiseaseViaEmpirical = createSelector(
  [selectGeneDomain],
  (gene) => gene.get('diseaseViaEmpirical').toJS()
);

export const selectDiseaseViaOrthology = createSelector(
  [selectGeneDomain],
  (gene) => gene.get('diseaseViaOrthology').toJS()
);

export const selectInteractions = createSelector(
  [selectGeneDomain],
  (gene) => gene.get('interactions').toJS()
);
