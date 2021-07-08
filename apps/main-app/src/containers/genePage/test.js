import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import configureStore from '../../lib/configureStore';

import GenePage from './index';

describe('GenePage', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore();
    const match = {
      params: {
        geneId: 'WBGene00197647'
      }
    };
    let htmlString = renderToString(
      <Provider store={store}>
        <Router>
          <GenePage match={match} />
        </Router>
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
