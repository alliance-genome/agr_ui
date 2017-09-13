import { fromJS } from 'immutable';
import {
  FETCH_DISEASE,
  FETCH_DISEASE_SUCCESS,
  FETCH_DISEASE_FAILURE,
  FETCH_ASSOCIATIONS,
  FETCH_ASSOCIATIONS_SUCCESS,
  FETCH_ASSOCIATIONS_FAILURE,
  SET_PER_PAGE_SIZE,
  SET_CURRENT_PAGE,
} from '../actions/disease';

export const DEFAULT_STATE = fromJS({
  data: null,
  error: null,
  loading: false,
  associations: null,
  loadingAssociations: false,
  associationsError: null,
  currentPage: 1,
  perPageSize: 10,
  totalAssociations: 0,
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

  case FETCH_ASSOCIATIONS:
    return state.set('loadingAssociations', true);

  case FETCH_ASSOCIATIONS_SUCCESS:
    return state.set('loadingAssociations', false)
      .set('associations', action.payload.results)
      .set('totalAssociations', action.payload.total)
      .set('associationsError',null);

  case FETCH_ASSOCIATIONS_FAILURE:
    return state.set('loadingAssociations', false)
      .set('associations', null)
      .set('associationsError', action.payload);

  case SET_PER_PAGE_SIZE:
    return state.set('perPageSize',action.payload)
      .set('currentPage',1);

  case SET_CURRENT_PAGE:
    return state.set('currentPage',action.payload);

  default:
    return state;
  }
};

export default diseaseReducer;
