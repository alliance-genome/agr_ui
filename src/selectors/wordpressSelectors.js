import { createSelector } from 'reselect';

export const selectWordpressDomain = (state) => state.wordpress;

export const selectLoading = createSelector(
  [selectWordpressDomain],
  (wordpress) => wordpress.get('loading')
);

export const selectPage = createSelector(
  [selectWordpressDomain],
  (wordpress) => wordpress.get('page')
);

export const selectPostList = createSelector(
  [selectWordpressDomain],
  (wordpress) => wordpress.get('postList')
);

export const selectPost = createSelector(
  [selectWordpressDomain],
  (wordpress) => wordpress.get('post')
);
