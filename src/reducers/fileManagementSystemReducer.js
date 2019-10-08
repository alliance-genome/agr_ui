import {fromJS} from 'immutable';
import {forObjectRequestAction, handleActions} from '../lib/handleActions';
import {FETCH_RELEASE_FILES} from '../actions/fileManagementSystemActions';

const DEFAULT_STATE = fromJS({
  files: {
    data: [],
    loading: false,
    error: null,
  }
});

const fileManagementSystemReducer = handleActions(DEFAULT_STATE,
  forObjectRequestAction(FETCH_RELEASE_FILES, 'files')
);

export default fileManagementSystemReducer;
