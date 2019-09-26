import assert from 'assert';
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
      type: 'FETCH_GENE_ASSOCIATIONS_SUCCESS',
      payload: jsonResult
    };
    const returnedState = reducer(undefined, action);
    const associations = returnedState.get('geneAssociations').toJS();
    assert.equal(associations.total, jsonResult.total);
    assert.equal(associations.error, null);
    assert.deepEqual(associations.data, jsonResult.results);

  });

  it('fetchAssociationsFailure', () => {
    const errorMsg = 'Request failed';
    const action = {
      type: 'FETCH_GENE_ASSOCIATIONS_FAILURE',
      payload: errorMsg
    };
    const returnedState = reducer(undefined, action);
    assert.equal(returnedState.get('geneAssociations').toJS().error, errorMsg);
  });
});
