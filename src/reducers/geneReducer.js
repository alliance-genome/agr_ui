import { fromJS } from 'immutable';
import {
  FETCH_GENE,
  FETCH_ALLELES,
  FETCH_PHENOTYPES,
} from '../actions/genes';
import { handleActions, forObjectRequestAction, forCollectionRequestAction } from '../lib/handleActions';

const DEFAULT_STATE = fromJS({
  alleles: {
    data: [],
    error: null,
    loading: false,
    total: 0,
  },
  data: null,
  error: null,
  loading: false,
  phenotypes: {
    data: [],
    error: null,
    loading: false,
    total: 0,
  },
});

const geneReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_GENE),
  forCollectionRequestAction(FETCH_ALLELES, 'alleles'),
  forCollectionRequestAction(FETCH_PHENOTYPES, 'phenotypes')
);

export default geneReducer;
