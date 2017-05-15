import { fromJS } from 'immutable';
import { FETCH_WP, FETCH_WP_SUCCESS, FETCH_WP_FAILURE } from '../actions/wp';

const DEFAULT_STATE = fromJS({
  data: null,
  error: null,
  loading: false,
});

const wpReducer = function (state = DEFAULT_STATE, action) {
  switch(action.type) {
  case FETCH_WP:
    return state.set('loading', true);

  case FETCH_WP_SUCCESS:
    return state.set('loading', false)
      .set('data', action.payload)
      .set('error', null);

  case FETCH_WP_FAILURE:
    return state.set('loading', false)
      .set('data', null)
      .set('error', action.payload);

  default:
    return state;
  }
};

export default wpReducer;
