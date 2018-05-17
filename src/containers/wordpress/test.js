import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';

import configureStore from '../../lib/configureStore';

import { WordpressPage } from './index';

describe('Wordpress', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore();
    let htmlString = renderToString(
      <Provider store={store}>
        <WordpressPage />
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
