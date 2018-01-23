import { fromJS } from 'immutable';
import {
  FETCH_WORDPRESS_PAGE,
  FETCH_WORDPRESS_PAGE_SUCCESS,
  FETCH_WORDPRESS_PAGE_FAILURE,
  FETCH_WORDPRESS_POST_LIST,
  FETCH_WORDPRESS_POST_LIST_SUCCESS,
  FETCH_WORDPRESS_POST_LIST_FAILURE,
  FETCH_WORDPRESS_POST,
  FETCH_WORDPRESS_POST_SUCCESS,
  FETCH_WORDPRESS_POST_FAILURE,
} from '../actions/wordpress';

const DEFAULT_STATE = fromJS({
  page: null,
  post: null,
  postList: null,
  error: null,
  loading: false,
});

const wordpressReducer = function (state = DEFAULT_STATE, action) {
  switch(action.type) {
  case FETCH_WORDPRESS_POST_LIST:
    return state.set('loading', true);

  case FETCH_WORDPRESS_POST_LIST_SUCCESS:
    return state.set('loading', false)
      .set('postList', action.payload)
      .set('error', null);

  case FETCH_WORDPRESS_POST_LIST_FAILURE:
    return state.set('loading', false)
      .set('postList', [])
      .set('error', action.payload);

  case FETCH_WORDPRESS_POST:
    return state.set('loading', true);

  case FETCH_WORDPRESS_POST_SUCCESS:
    return state.set('loading', false)
      .set('post', action.payload[0])
      .set('error', null);

  case FETCH_WORDPRESS_POST_FAILURE:
    return state.set('loading', false)
      .set('post', null)
      .set('error', action.payload);

  case FETCH_WORDPRESS_PAGE:
    return state.set('loading', true);

  case FETCH_WORDPRESS_PAGE_SUCCESS:
    return state.set('loading', false)
      .set('page', action.payload)
      .set('error', null);

  case FETCH_WORDPRESS_PAGE_FAILURE:
    return state.set('loading', false)
      .set('page', null)
      .set('error', action.payload);

  default:
    return state;
  }
};

export default wordpressReducer;
