import { fromJS } from 'immutable';
import { FETCH_SUMMARY, FETCH_SUMMARY_FAILURE, FETCH_SUMMARY_SUCCESS } from '../actions/expression';

const DEFAULT_STATE = fromJS({
  summaries: {},
  annotations: {},
});

const expressionReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
  case FETCH_SUMMARY:
    return state
      .setIn(['summaries', action.id, 'loading'], true);

  case FETCH_SUMMARY_SUCCESS:
    return state
      .setIn(['summaries', action.id, 'loading'], false)
      .setIn(['summaries', action.id, 'data'], action.summary)
      .setIn(['summaries', action.id, 'error'], null);

  case FETCH_SUMMARY_FAILURE:
    return state
      .setIn(['summaries', action.id, 'loading'], false)
      .setIn(['summaries', action.id, 'data'], null)
      .setIn(['summaries', action.id, 'error'], action.error);

  default:
    return state;
  }
};

export default expressionReducer;
