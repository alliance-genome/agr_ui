import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'react-router';

import configureStore from '../../../lib/configureStore';
import{ WP_POST_BASE_URL } from '../../../constants';

import WordpressFeeds from './index';

let homeUrl= WP_POST_BASE_URL;
let historyObj = createMemoryHistory(homeUrl);

describe('WordpressFeeds', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore(historyObj);
    let htmlString = renderToString(
      <Provider store={store}>
        <WordpressFeeds />
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
