import assert from 'assert';

import configureStore from '../configureStore';

describe('Store', () => {
  it('can be initialized to an object', () => {
    let store = configureStore();
    assert.equal(typeof store, 'object');
  });

  it('can getState() and return an object', () => {
    let store = configureStore();
    let state = store.getState();
    assert.equal(typeof state, 'object');
  });
});
