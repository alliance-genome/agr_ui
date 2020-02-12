import {fromJS} from 'immutable';
import {
  forCollectionRequestAction,
  forObjectRequestAction,
  handleActions
} from '../lib/handleActions';
import {
  FETCH_ALLELE,
  FETCH_ALLELE_PHENOTYPES,
  FETCH_ALLELE_DISEASE,
  FETCH_ALLELE_VARIANTS
} from '../actions/alleleActions';

const DEFAULT_STATE = fromJS({
  data: null,
  error: null,
  loading: false,
  phenotypes: {
    data: [],
    loading: false,
    error: null,
    total: 0,
  },
  diseaseAssociations: {
    data: [],
    loading: false,
    error: null,
    total: 0
  },
  variants: {
    data: [],
    loading: false,
    error: null,
    total: 0
  },
});

const alleleReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_ALLELE),
  forCollectionRequestAction(FETCH_ALLELE_PHENOTYPES, 'phenotypes'),
  forCollectionRequestAction(FETCH_ALLELE_DISEASE, 'diseaseAssociations'),
  forCollectionRequestAction(FETCH_ALLELE_VARIANTS, 'variants'),
);

export default alleleReducer;
