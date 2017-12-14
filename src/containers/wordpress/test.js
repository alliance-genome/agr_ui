import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'react-router';

import configureStore from '../../lib/configureStore';

import { WordpressPage } from './index';

let historyObj = createMemoryHistory('/publications');

describe('Wordpress', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore(historyObj);
    let htmlString = renderToString(
      <Provider store={store}>
        <WordpressPage />
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
