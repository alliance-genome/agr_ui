import { fromJS } from 'immutable';
import {
  FETCH_EXPRESSION_RIBBON_SUMMARY,
  FETCH_EXPRESSION_ANNOTATIONS,
} from '../actions/expression';
import { handleActions, forObjectRequestAction, forCollectionRequestAction } from '../lib/handleActions';

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

const expressionReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_EXPRESSION_RIBBON_SUMMARY, 'summary'),
  forCollectionRequestAction(FETCH_EXPRESSION_ANNOTATIONS, 'annotations'),
);

export default expressionReducer;
