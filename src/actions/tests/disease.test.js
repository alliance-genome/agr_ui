import assert from 'assert';
import * as actionsAndTypes from '../disease';

describe('Disease actions', () => {

  /*
  TODO - Write tests for fetchAssociations()
  We should really test the fetchAssociations() function using a mock API response
  along the lines of
  http://redux.js.org/docs/recipes/WritingTests.html#async-action-creators.

  The current fetchData function relies on jQuery to make ajax calls, which makes
  mocking an API response difficult in our current environment.  Switching to
  isomorphic-fetch or superagent would allow use of API mocking libraries such as nock.
   */

  it('fetchAssociationsRequest()', () => {
    assert.deepEqual(actionsAndTypes.fetchAssociationsRequest(), { type: actionsAndTypes.FETCH_ASSOCIATIONS});
  });

  it('fetchAssociationsSuccess()', () => {
    const associations = [
      {
        geneDocument: {
          symbol: 'Adk1'
        },
        associationType: 'is_implicated_in',
        id: 'DOID:9452:MGI:87930',
        disease_id: 'DOID:9452'
      },
      {
        geneDocument: {
          symbol: 'Adk2'
        },
        associationType: 'is_implicated_in',
        id: 'DOID:9452:MGI:87930',
        disease_id: 'DOID:9452'
      }
    ];
    assert.deepEqual(actionsAndTypes.fetchAssociationsSuccess(associations), { type: actionsAndTypes.FETCH_ASSOCIATIONS_SUCCESS, payload: associations});
  });

  it('fetchAssociationsFailure()', () => {
    assert.deepEqual(actionsAndTypes.fetchAssociationsFailure('I failed :-('), { type: actionsAndTypes.FETCH_ASSOCIATIONS_FAILURE, payload: 'I failed :-('});
  });

  it('setCurrentPage', () => {
    assert.deepEqual(actionsAndTypes.setCurrentPage(2), { type: actionsAndTypes.SET_CURRENT_PAGE, payload: 2});
  });

  it('setPerPageSize', () => {
    assert.deepEqual(actionsAndTypes.setPerPageSize(100), { type: actionsAndTypes.SET_PER_PAGE_SIZE, payload: 100});
  });
});
