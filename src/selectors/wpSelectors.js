import { createSelector } from 'reselect';

export const selectWpDomain = (state) => state.wp;

export const selectLoading = createSelector(
  [selectWpDomain],
  (wordpress) => wordpress.get('loading')
);

export const selectPage = createSelector(
  [selectWpDomain],
  (wordpress) => wordpress.get('page')
);

export const selectPostList = createSelector(
  [selectWpDomain],
  (wordpress) => wordpress.get('postList')
);

export const selectPost = createSelector(
  [selectWpDomain],
  (wordpress) => wordpress.get('post')
);
