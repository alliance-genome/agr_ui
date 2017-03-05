import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'react-router';

import configureStore from '../../lib/configureStore';

import GenePage from './index';

let historyObj = createMemoryHistory('/gene/WBGene00197647');

describe('GenePage', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore(historyObj);
    let htmlString = renderToString(
      <Provider store={store}>
        <GenePage params={{geneId: 'WBGene00197647'}} />
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
