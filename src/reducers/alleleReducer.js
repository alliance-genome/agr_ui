import {fromJS} from 'immutable';
import {
  forCollectionRequestAction,
  forObjectRequestAction,
  handleActions
} from '../lib/handleActions';
import {FETCH_ALLELE, FETCH_ALLELE_DISEASE} from '../actions/alleleActions';

const DEFAULT_STATE = fromJS({
  data: null,
  error: null,
  loading: false,
  diseaseAssociations: {
    data: [],
    loading: false,
    error: null,
    total: 0
  },
});

const alleleReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_ALLELE),
  forCollectionRequestAction(FETCH_ALLELE_DISEASE, 'diseaseAssociations'),
);

export default alleleReducer;
