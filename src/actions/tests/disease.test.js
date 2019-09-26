import assert from 'assert';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import * as actionsAndTypes from '../diseaseActions';

const mockStore = configureMockStore([thunk]);
const mockPayload = {
  body: {
    results: [
      { disease: 'disease1' },
      { disease: 'disease2' },
    ],
    total: 2,
    errorMessage: '',
  },
  headers: { 'content-type': 'application/json' }
};

describe('Disease actions', () => {
  afterEach(() => fetchMock.restore());

  it('fetch gene associations', () => {
    fetchMock.getOnce('express:/api/disease/:id/genes', mockPayload);
    const expectedActions = [
      { type: actionsAndTypes.FETCH_GENE_ASSOCIATIONS + '_REQUEST' },
      { type: actionsAndTypes.FETCH_GENE_ASSOCIATIONS + '_SUCCESS', payload: mockPayload.body },
    ];
    const store = mockStore({});
    return store.dispatch(actionsAndTypes.fetchGeneAssociations()).then(() => {
      assert.deepEqual(store.getActions(), expectedActions);
    });
  });

  it('fetch allele associations', () => {
    fetchMock.getOnce('express:/api/disease/:id/alleles', mockPayload);
    const expectedActions = [
      { type: actionsAndTypes.FETCH_ALLELE_ASSOCIATIONS + '_REQUEST' },
      { type: actionsAndTypes.FETCH_ALLELE_ASSOCIATIONS + '_SUCCESS', payload: mockPayload.body },
    ];
    const store = mockStore({});
    return store.dispatch(actionsAndTypes.fetchAlleleAssociations()).then(() => {
      assert.deepEqual(store.getActions(), expectedActions);
    });
  });

  it('fetch model associations', () => {
    fetchMock.getOnce('express:/api/disease/:id/models', mockPayload);
    const expectedActions = [
      { type: actionsAndTypes.FETCH_MODEL_ASSOCIATIONS + '_REQUEST' },
      { type: actionsAndTypes.FETCH_MODEL_ASSOCIATIONS + '_SUCCESS', payload: mockPayload.body },
    ];
    const store = mockStore({});
    return store.dispatch(actionsAndTypes.fetchModelAssociations()).then(() => {
      assert.deepEqual(store.getActions(), expectedActions);
    });
  });
});
