import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clone from 'lodash.clone';
import { stringify as stringifyQueryString } from 'query-string';

import fetchData from '../../lib/fetchData';
import FilterSelector from './filterSelector/filterSelector';
import MultiTable from './multiTable';
import SearchBreadcrumbs from './searchBreadcrumbs';
import SearchControls from './searchControls';
import ResultsList from './resultsList';
import ResultsTable from './resultsTable';
import { SMALL_COL_CLASS, LARGE_COL_CLASS, SEARCH_API_ERROR_MESSAGE } from '../../constants';
import { receiveResponse, setError, setPending } from '../../actions/search';
import LoadingPage from '../../components/loadingPage';
import HeadMetaTags from '../../components/headMetaTags';

// used to test rendering fixture response
import fixtureResponse from './tests/fixtureResponse';

import {
  selectActiveCategory,
  selectErrorMessage,
  selectIsError,
  selectIsReady,
  selectQueryParams,
  selectResults,
  selectPageSize
} from '../../selectors/searchSelectors';

const BASE_SEARCH_URL = '/api/search';

class SearchComponent extends Component {
  // fetch data at start
  componentDidMount() {
    // this.fetchFixtureData(); // uncomment to use fixture mode
    this.fetchSearchData();
  }

  // fetch data whenever URL changes within /search
  componentDidUpdate (prevProps) {
    if (prevProps.location !== this.props.location) {
      this.fetchSearchData();
    }
  }

  fetchFixtureData() {
    this.props.dispatch(receiveResponse(fixtureResponse, this.props.queryParams));
    this.props.dispatch(setError(false));
    this.props.dispatch(setPending(false));
  }

  fetchSearchData() {
    // edit for pagination
    let size = this.props.pageSize;
    let _limit = size;
    let _offset = (this.props.currentPage - 1) * size;
    let qp = clone(this.props.queryParams);
    qp.limit = _limit;
    qp.offset = _offset;
    const searchUrl = `${BASE_SEARCH_URL}?${stringifyQueryString(qp)}`;
    this.props.dispatch(setPending(true));
    fetchData(searchUrl)
      .then( (data) => {
        this.props.dispatch(receiveResponse(data, this.props.queryParams));
        this.props.dispatch(setError(false));
        this.props.dispatch(setPending(false));
      })
      .catch( (e) => {
        this.props.dispatch(setPending(false));
        if (process.env.NODE_ENV === 'production') {
          this.props.dispatch(setError(SEARCH_API_ERROR_MESSAGE));
        } else {
          throw(e);
        }
      });
  }

  renderResultsNode() {
    if (this.props.isMultiTable) {
      return <MultiTable queryParams={this.props.queryParams} />;
    } else if (this.props.isTable) {
      return <ResultsTable activeCategory={this.props.activeCategory} entries={this.props.results} query={this.props.queryParams.q} />;
    } else {
      return <ResultsList entries={this.props.results} />;
    }
  }

  renderErrorNode() {
    if (!this.props.isError) {
      return null;
    }
    return (
      <div className='alert alert-warning'>
        <h3>Oops, Error</h3>
        <p>{this.props.errorMessage}</p>
      </div>
    );
  }

  render() {
    if (!this.props.isReady) return <LoadingPage />;
    let title = 'Search ' + (this.props.queryParams.q || '');
    return (
      <div className='container'>
        {this.renderErrorNode()}
        <HeadMetaTags title={title} />
        <div className='row'>
          <div className={SMALL_COL_CLASS}>
            <FilterSelector queryParams={this.props.queryParams} />
          </div>
          <div className={LARGE_COL_CLASS}>
            <SearchBreadcrumbs queryParams={this.props.queryParams} />
            <SearchControls queryParams={this.props.queryParams} />
            {this.renderResultsNode()}
            <SearchControls queryParams={this.props.queryParams} />
          </div>
        </div>
      </div>
    );
  }
}

SearchComponent.propTypes = {
  activeCategory: PropTypes.string,
  currentPage: PropTypes.number,
  dispatch: PropTypes.func,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isMultiTable: PropTypes.bool,
  isReady: PropTypes.bool,
  isTable: PropTypes.bool,
  location: PropTypes.shape({
    query: PropTypes.object.isRequired,
  }),
  mode: PropTypes.string,
  pageSize: PropTypes.number,
  queryParams: PropTypes.object,
  results: PropTypes.array
};

function mapStateToProps(state, ownProps) {
  let _queryParams = selectQueryParams(state, ownProps);
  let _mode = _queryParams.mode;
  let _isTable = (_mode === 'table');
  let _currentPage = parseInt(_queryParams.page) || 1;
  let _activeCategory = selectActiveCategory(state);
  let _isMultiTable = (_isTable && _activeCategory === 'none');
  return {
    activeCategory: _activeCategory,
    currentPage: _currentPage,
    errorMessage: selectErrorMessage(state),
    isError: selectIsError(state),
    isMultiTable: _isMultiTable,
    isReady: selectIsReady(state),
    isTable: _isTable,
    mode: _mode,
    pageSize: selectPageSize(state),
    queryParams: _queryParams,
    results: selectResults(state)
  };
}

export { SearchComponent as SearchComponent };
export default connect(mapStateToProps)(SearchComponent);
