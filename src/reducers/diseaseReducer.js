import { fromJS } from 'immutable';
import { FETCH_DISEASE, FETCH_DISEASE_SUCCESS, FETCH_DISEASE_FAILURE } from '../actions/disease';

const DEFAULT_STATE = fromJS({
  data: null,
  error: null,
  loading: false,
});

const diseaseReducer = function (state = DEFAULT_STATE, action) {
  switch(action.type) {
  case FETCH_DISEASE:
    return state.set('loading', true);

  case FETCH_DISEASE_SUCCESS:
    return state.set('loading', false)
      .set('data', action.payload)
      .set('error', null);

  case FETCH_DISEASE_FAILURE:
    return state.set('loading', false)
      .set('data', null)
      .set('error', action.payload);

  default:
    return state;
  }
};

export default diseaseReducer;
