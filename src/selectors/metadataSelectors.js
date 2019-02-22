import { createSelector } from 'reselect';

export const selectMetadata = (state) => state.metadata;

export const selectSnapshot = createSelector(
  [selectMetadata],
  (metadata) => metadata.get('snapshot').toJS()
);
