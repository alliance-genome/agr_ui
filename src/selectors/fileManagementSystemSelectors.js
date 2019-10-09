import { createSelector } from 'reselect';

export const selectFileManagementSystem = (state) => state.fileManagementSystem;

export const selectFiles = createSelector(
  [selectFileManagementSystem],
  (fms) => fms.get('files').toJS()
);
