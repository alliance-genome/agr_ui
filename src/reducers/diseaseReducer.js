import { fromJS } from 'immutable';
import {
  FETCH_DISEASE,
  FETCH_GENE_ASSOCIATIONS,
  FETCH_ALLELE_ASSOCIATIONS
} from '../actions/diseaseActions';
import {
  forCollectionRequestAction,
  forObjectRequestAction,
  handleActions
} from '../lib/handleActions';

export const DEFAULT_STATE = fromJS({
  data: null,
  error: null,
  loading: false,
  associations: {
    data: [],
    loading: false,
    error: null,
    total: 0,
  },
  alleleAssociations:{
    data: [],
    loading: false,
    error: null,
    total: 0
  }
});

const diseaseReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_DISEASE),
  forCollectionRequestAction(FETCH_GENE_ASSOCIATIONS, 'associations'),
  forCollectionRequestAction(FETCH_ALLELE_ASSOCIATIONS, 'alleleAssociations')
);

export default diseaseReducer;
