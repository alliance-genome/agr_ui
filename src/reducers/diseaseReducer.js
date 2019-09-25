import {fromJS} from 'immutable';
import {
  FETCH_DISEASE,
  FETCH_GENE_ASSOCIATIONS,
  FETCH_ALLELE_ASSOCIATIONS,
  FETCH_MODEL_ASSOCIATIONS
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
  geneAssociations: {
    data: [],
    loading: false,
    error: null,
    total: 0,
  },
  alleleAssociations: {
    data: [],
    loading: false,
    error: null,
    total: 0
  },
  modelAssociations: {
    data: [],
    loading: false,
    error: null,
    total: 0
  },
});

const diseaseReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_DISEASE),
  forCollectionRequestAction(FETCH_GENE_ASSOCIATIONS, 'geneAssociations'),
  forCollectionRequestAction(FETCH_ALLELE_ASSOCIATIONS, 'alleleAssociations'),
  forCollectionRequestAction(FETCH_MODEL_ASSOCIATIONS, 'modelAssociations')
);

export default diseaseReducer;
