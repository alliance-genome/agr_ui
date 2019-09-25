import { fromJS } from 'immutable';
import { handleActions, forObjectRequestAction, forCollectionRequestAction } from '../lib/handleActions';
import { FETCH_DISEASE_RIBBON_SUMMARY, FETCH_DISEASE_RIBBON_ANNOTATIONS } from '../actions/diseaseRibbonActions';

const DEFAULT_STATE = fromJS({
  summary: {
    loading: false,
    error: null,
    data: {},
  },
  annotations: {
    loading: false,
    error: null,
    data: [],
    total: 0
  }
});

const diseaseRibbonReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_DISEASE_RIBBON_SUMMARY, 'summary'),
  forCollectionRequestAction(FETCH_DISEASE_RIBBON_ANNOTATIONS, 'annotations')
);

export default diseaseRibbonReducer;
