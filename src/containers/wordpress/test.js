import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'react-router';

import configureStore from '../../lib/configureStore';
import{ WP_REST_API_BASE_URL } from '../../constants';




import Wordpress from './index';

let homeUrl= WP_REST_API_BASE_URL+'home';
let historyObj = createMemoryHistory(homeUrl);

describe('Wordpress', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore(historyObj);
    let htmlString = renderToString(
      <Provider store={store}>
        <Wordpress />
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
