import { fromJS } from 'immutable';
import {
  FETCH_GENE,
  FETCH_GENE_SUCCESS,
  FETCH_GENE_FAILURE,
  FETCH_ALLELE,
  FETCH_ALLELE_SUCCESS,
  FETCH_ALLELE_FAILURE,
} from '../actions/genes';

const DEFAULT_STATE = fromJS({
  alleles: [],
  data: null,
  error: null,
  loading: false,
  loadingAllele: false,
  totalAlleles: 0,
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

  case FETCH_ALLELE:
    return state.set('loadingAllele', true);

  case FETCH_ALLELE_SUCCESS:
    return state.set('loadingAllele', false)
      .set('alleles', fromJS(action.payload.results))
      .set('totalAlleles', action.payload.total)
      .set('error', null);

  case FETCH_ALLELE_FAILURE:
    return state.set('loadingAllele', false)
      .set('totalAlleles', 0)
      .set('error', action.payload);

  default:
    return state;
  }
};

export default geneReducer;
