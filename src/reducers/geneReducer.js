import { fromJS } from 'immutable';
import { FETCH_GENE, FETCH_GENE_SUCCESS, FETCH_GENE_FAILURE } from '../actions/genes';

const DEFAULT_STATE = fromJS({
  data: null,
  error: null,
  loading: false,
});

const geneReducer = function (state = DEFAULT_STATE, action) {
  switch(action.type) {
  case FETCH_GENE:
    return state.set('loading', true);

  case FETCH_GENE_SUCCESS:
    return state.set('loading', false)
      .set('data', action.payload)
      .set('error', null);

  case FETCH_GENE_FAILURE:
    return state.set('loading', false)
      .set('data', null)
      .set('error', action.payload);

  default:
    return state;
  }
};

export default geneReducer;
