import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';

import configureStore from '../../lib/configureStore';

import GenePage from './index.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('GenePage', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore();
    const queryClient = new QueryClient();
    const match = {
      params: {
        geneId: 'WBGene00197647',
      },
    };
    let htmlString = renderToString(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <GenePage match={match} />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
