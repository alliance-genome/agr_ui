import { fromJS } from 'immutable';
import { FETCH_SNAPSHOT } from '../actions/metadata';
import { handleActions, forObjectRequestAction } from '../lib/handleActions';

const DEFAULT_STATE = fromJS({
  snapshot: {
    data: null,
    error: null,
    loading: false,
  }
});

const metadataReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_SNAPSHOT, 'snapshot')
);

export default metadataReducer;
