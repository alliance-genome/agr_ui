import fetchData from '../lib/fetchData';
import {
  WORDPRESS_PAGE_BASE_URL,
  WORDPRESS_POST_BASE_URL,
  WORDPRESS_POST_URL
} from '../constants';
/* eslint-disable */
export const FETCH_WORDPRESS_POST_LIST = 'FETCH_WORDPRESS_POST_LIST';
export const FETCH_WORDPRESS_POST_LIST_SUCCESS = 'FETCH_WORDPRESS_POST_LIST_SUCCESS';
export const FETCH_WORDPRESS_POST_LIST_FAILURE = 'FETCH_WORDPRESS_POST_LIST_FAILURE';

export const FETCH_WORDPRESS_POST = 'FETCH_WORDPRESS_POST';
export const FETCH_WORDPRESS_POST_SUCCESS = 'FETCH_WORDPRESS_POST_SUCCESS';
export const FETCH_WORDPRESS_POST_FAILURE = 'FETCH_WORDPRESS_POST_FAILURE';

export const FETCH_WORDPRESS_PAGE = 'FETCH_WORDPRESS_PAGE';
export const FETCH_WORDPRESS_PAGE_SUCCESS = 'FETCH_WORDPRESS_PAGE_SUCCESS';
export const FETCH_WORDPRESS_PAGE_FAILURE = 'FETCH_WORDPRESS_PAGE_FAILURE';

export const fetchWordpressPostList = function () {
  return (dispatch) => {
    dispatch({
      type: FETCH_WORDPRESS_POST_LIST
    });
    fetchData(WORDPRESS_POST_BASE_URL)
      .then(data => dispatch(fetchWordpressPostListSuccess(data)))
      .catch(error => dispatch(fetchWordpressPostListFailure(error)));
  };
};

export const fetchWordpressPostListSuccess = function (postList) {
  return {
    type: FETCH_WORDPRESS_POST_LIST_SUCCESS,
    payload: postList,
  };
};

export const fetchWordpressPostListFailure = function (error) {
  return {
    type: FETCH_WORDPRESS_POST_LIST_FAILURE,
    payload: error,
  };
};

export const fetchWordpressPost = function (slug) {
  return (dispatch) => {
    dispatch({
      type: FETCH_WORDPRESS_POST
    });
    fetchData(WORDPRESS_POST_URL + slug)
      .then(data => dispatch(fetchWordpressPostSuccess(data)))
      .catch(error => dispatch(fetchWordpressPostFailure(error)));
  };
};

export const fetchWordpressPostSuccess = function (post) {
  return {
    type: FETCH_WORDPRESS_POST_SUCCESS,
    payload: post,
  };
};

export const fetchWordpressPostFailure = function (error) {
  return {
    type: FETCH_WORDPRESS_POST_FAILURE,
    payload: error,
  };
};

export const fetchWordpressPage = function (slug) {
  return (dispatch) => {
    dispatch({
      type: FETCH_WORDPRESS_PAGE
    });
    fetchData(WORDPRESS_PAGE_BASE_URL + slug)
      .then(data => {
        if (data && data[0]) {
          dispatch(fetchWordpressPageSuccess(data[0]));
        } else {
          // throw our own error, since Wordpress API doesn't return 404 when page is not found
          throw new Error('Page not found');
        }
      })
      .catch(error => dispatch(fetchWordpressPageFailure(error)));
  };
};

export const fetchWordpressPageSuccess = function (page) {
  return {
    type: FETCH_WORDPRESS_PAGE_SUCCESS,
    payload: page,
  };
};

export const fetchWordpressPageFailure = function (error) {
  return {
    type: FETCH_WORDPRESS_PAGE_FAILURE,
    payload: error,
  };
};
