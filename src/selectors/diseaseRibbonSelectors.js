import { createSelector } from 'reselect';

export const selectDiseaseRibbon = (state) => state.diseaseRibbon;

export const selectDiseaseRibbonSummary = createSelector(
  [selectDiseaseRibbon],
  diseaseRibbon => diseaseRibbon.get('summary').toJS()
);

