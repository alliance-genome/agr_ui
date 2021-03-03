import { fromJS } from 'immutable';
import {PAGE_LOADING} from '../actions/loadingActions';

const DEFAULT_STATE = fromJS({
  pageLoading: false,
});

const loadingReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case PAGE_LOADING:
    return state.set('pageLoading', action.payload);
  default:
    return state;
  }
};

export default loadingReducer;
