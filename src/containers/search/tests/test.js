import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../../../lib/configureStore';
import SearchContainer from '../search';
import { FilterSelectorComponent } from '../filterSelector/filterSelector';
import ResultsTable from '../resultsTable';
import { SearchBreadcrumbsComponent } from '../searchBreadcrumbs';
import { SearchControlsComponent } from '../searchControls';
import fixtureResponse from './fixtureResponse';
import { receiveResponse } from '../../../actions/search';

let historyObj = createMemoryHistory('/search');

describe('Search', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore(historyObj);
    let htmlString = renderToString(<Provider store={store}><SearchContainer /></Provider>);
    assert.equal(typeof htmlString, 'string');
  });

  it('should be able to render after getting a response', () => {
    let store = configureStore(historyObj);
    store.dispatch(receiveResponse(fixtureResponse, { q: 'kinase' }));
    let htmlString = renderToString(<Provider store={store}><SearchContainer /></Provider>);
    assert.equal(typeof htmlString, 'string');
  });
});

describe('SearchBreadcrumbs', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(<SearchBreadcrumbsComponent queryParams={{ page: 0, query: 'actin' }} total={5} />);
    assert.equal(typeof htmlString, 'string');
  });
});


describe('SearchControls', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(
      <SearchControlsComponent
        currentPage={1}
        isTable
        queryParams={{}}
        totalPages={5}
      />
    );
    assert.equal(typeof htmlString, 'string');
  });
});

describe('ResultsTable', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(<ResultsTable entries={[]} />);
    assert.equal(typeof htmlString, 'string');
  });
});

describe('FilterSelector', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(<FilterSelectorComponent aggregations={[]} />);
    assert.equal(typeof htmlString, 'string');
  });
});
