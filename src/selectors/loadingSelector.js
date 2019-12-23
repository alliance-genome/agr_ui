import { createSelector } from 'reselect';

export const selectLoadingDomain = (state) => state.loading;

export const selectPageLoading = createSelector(
  [selectLoadingDomain],
  loading => loading.get('pageLoading')
);

export const anyPendingRequests = createSelector(
  [selectLoadingDomain],
  loading => !loading.get('pendingRequests').isEmpty()
);
