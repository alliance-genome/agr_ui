import { fromJS } from 'immutable';
import {
  FETCH_GENE,
  FETCH_ORTHOLOGS,
  FETCH_ALLELES,
  FETCH_PHENOTYPES,
  FETCH_DISEASE_VIA_EMPIRICAL,
  FETCH_DISEASE_VIA_ORTHOLOGY,
  FETCH_INTERACTIONS,
} from '../actions/genes';
import { handleActions, forObjectRequestAction, forCollectionRequestAction } from '../lib/handleActions';

const DEFAULT_STATE = fromJS({
  orthologs: {
    data: [],
    error: null,
    loading: false,
    total: 0,
  },
  alleles: {
    data: [],
    error: null,
    loading: false,
    total: 0,
  },
  data: null,
  diseaseViaEmpirical: {
    data: [],
    error: null,
    loading: false,
    total: 0,
  },
  diseaseViaOrthology: {
    data: [],
    error: null,
    loading: false,
    total: 0,
  },
  error: null,
  interactions: {
    data: [],
    error: null,
    loading: false,
    total: 0,
  },
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
  forCollectionRequestAction(FETCH_ORTHOLOGS, 'orthologs'),
  forCollectionRequestAction(FETCH_ALLELES, 'alleles'),
  forCollectionRequestAction(FETCH_PHENOTYPES, 'phenotypes'),
  forCollectionRequestAction(FETCH_DISEASE_VIA_EMPIRICAL, 'diseaseViaEmpirical'),
  forCollectionRequestAction(FETCH_DISEASE_VIA_ORTHOLOGY, 'diseaseViaOrthology'),
  forCollectionRequestAction(FETCH_INTERACTIONS, 'interactions')
);

export default geneReducer;
