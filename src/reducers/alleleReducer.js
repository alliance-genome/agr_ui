import {fromJS} from 'immutable';
import {forObjectRequestAction, handleActions} from '../lib/handleActions';
import {FETCH_ALLELE} from '../actions/alleleActions';

const DEFAULT_STATE = fromJS({
  data: null,
  error: null,
  loading: false,
});

const alleleReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_ALLELE)
);

export default alleleReducer;
