import assert from 'assert';
import * as actionsAndTypes from '../../actions/disease';
import reducer, {DEFAULT_STATE} from '../diseaseReducer';

describe('Disease reducer', () => {
  it('Returns initial state', () => {
    const returnedState = reducer(undefined, {});
    assert.deepEqual(returnedState,DEFAULT_STATE);
  });

  it('fetchAssociationsSuccess', () => {
    const jsonResult = {
      total: 13,
      results: [
        { diseaseName: 'blah1'},
        { diseaseName: 'blah2'},
      ]
    };

    const action = {
      type: actionsAndTypes.FETCH_ASSOCIATIONS_SUCCESS,
      payload: jsonResult
    };
    const returnedState = reducer(undefined, action);
    assert.equal(returnedState.get('totalAssociations'),jsonResult.total);
    assert.equal(returnedState.get('associationsError'),'');
    assert.deepEqual(returnedState.get('associations').toJS(), jsonResult.results);

  });

  it('fetchAssociationsFailure', () => {
    const errorMsg = 'Request failed';
    const action = {
      type: actionsAndTypes.FETCH_ASSOCIATIONS_FAILURE,
      payload: errorMsg
    };
    const returnedState = reducer(undefined, action);
    assert.equal(returnedState.get('associationsError'), errorMsg);
  });

  it('setCurrentPage', () => {
    const currentPage = 42;
    const action = { type: actionsAndTypes.SET_CURRENT_PAGE, payload: currentPage };
    const returnedState = reducer(undefined, action);
    assert.deepEqual(returnedState.get('currentPage'), currentPage);
  });

  it('setPerPageSize', () => {
    const perPageSize = 4;
    const action = { type: actionsAndTypes.SET_PER_PAGE_SIZE, payload: perPageSize };
    const returnedState = reducer(undefined, action);
    assert.deepEqual(returnedState.get('perPageSize'), perPageSize);
  });
});
