import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import configureStore from '../../lib/configureStore';

import { WordpressPage } from './index';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Wordpress', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore();
    const queryClient = new QueryClient();
    let htmlString = renderToString(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <WordpressPage />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
