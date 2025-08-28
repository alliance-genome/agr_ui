import assert from 'assert';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';

import configureStore from '../../../lib/configureStore';
import SearchContainer from '../search.jsx';
import { FilterSelectorComponent } from '../filterSelector/filterSelector.jsx';
import ResultsTable from '../resultsTable.jsx';
import SearchBreadcrumbs from '../searchBreadcrumbs.jsx';
import { SearchControlsComponent } from '../searchControls.jsx';
import fixtureResponse from './fixtureResponse';
import { receiveResponse } from '../../../actions/search';

describe('Search', () => {
  it('should be able to render to an HTML string', () => {
    let store = configureStore();
    let htmlString = renderToString(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/search" element={<SearchContainer />} />
          </Routes>
        </Router>
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });

  it('should be able to render after getting a response', () => {
    let store = configureStore();
    store.dispatch(receiveResponse(fixtureResponse, { q: 'kinase' }));
    let htmlString = renderToString(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/search" element={<SearchContainer />} />
          </Routes>
        </Router>
      </Provider>
    );
    assert.equal(typeof htmlString, 'string');
  });
});

describe('SearchBreadcrumbs', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(
      <Router>
        <SearchBreadcrumbs queryParams={{ page: 0, query: 'actin' }} total={5} />
      </Router>
    );
    assert.equal(typeof htmlString, 'string');
  });
});

describe('SearchControls', () => {
  it('should be able to render to an HTML string', () => {
    let htmlString = renderToString(
      <Router>
        <SearchControlsComponent currentPage={1} isTable queryParams={{}} totalPages={5} />
      </Router>
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
    let htmlString = renderToString(
      <Router>
        <FilterSelectorComponent aggregations={[]} />
      </Router>
    );
    assert.equal(typeof htmlString, 'string');
  });
});
