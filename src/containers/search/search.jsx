import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clone from 'lodash.clone';
import { stringifyQuery } from '../../lib/searchHelpers.jsx';

import fetchData from '../../lib/fetchData';
import FilterSelector from './filterSelector/filterSelector.jsx';
import MultiTable from './multiTable.jsx';
import SearchBreadcrumbs from './searchBreadcrumbs.jsx';
import SearchControls from './searchControls.jsx';
import ResultsList from './resultsList.jsx';
import ResultsTable from './resultsTable.jsx';
import { SMALL_COL_CLASS, LARGE_COL_CLASS, SEARCH_API_ERROR_MESSAGE } from '../../constants';
import { receiveResponse, setError } from '../../actions/search';
import LoadingPage from '../../components/loadingPage.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';

import style from './style.module.scss';

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
import {setPageLoading} from '../../actions/loadingActions';
import TotalCount from './TotalCount.jsx';
import {SearchBarComponent} from '../layout/searchBar/index.jsx';

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
    this.props.dispatch(setPageLoading(false));
  }

  fetchSearchData() {
    // edit for pagination
    let size = this.props.pageSize;
    let _limit = size;
    let _offset = (this.props.currentPage - 1) * size;
    let qp = clone(this.props.queryParams);
    qp.limit = _limit;
    qp.offset = _offset;
    const searchUrl = `${BASE_SEARCH_URL}?${stringifyQuery(qp)}`;
    this.props.dispatch(setPageLoading(true));
    fetchData(searchUrl, undefined, 60000)
      .then( (data) => {
        this.props.dispatch(receiveResponse(data, this.props.queryParams));
        this.props.dispatch(setError(false));
        this.props.dispatch(setPageLoading(false));
      })
      .catch( (e) => {
        this.props.dispatch(setPageLoading(false));
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
    const { isReady, queryParams } = this.props;
    let title = 'Search ' + (queryParams.q || '');
    return (
      <>
        <HeadMetaTags title={title} />

        <div className={`${style.searchBarBackground} shadow-sm`}>
          <div className='container'>
            <div className={style.searchBarContainer}>
              <SearchBarComponent />
            </div>
          </div>
        </div>


        <div className='container'>
          {this.renderErrorNode()}

          {!isReady && <LoadingPage />}

          {isReady &&
          <div className='row mb-3'>
            <div className={SMALL_COL_CLASS}>
              <FilterSelector queryParams={queryParams} />
            </div>
            <div className={LARGE_COL_CLASS}>
              <div
                className='d-flex justify-content-between align-items-baseline'
              >
                <span><TotalCount /> results {queryParams.q &&
                    <span>for <b>{queryParams.q}</b></span>}</span>
                <SearchControls queryParams={queryParams} />
              </div>
              <SearchBreadcrumbs queryParams={queryParams} />
              {this.renderResultsNode()}
              <SearchControls queryParams={queryParams} />
            </div>
          </div>
          }
        </div>
      </>
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
  location: PropTypes.any.isRequired,
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

export { SearchComponent };
export default connect(mapStateToProps)(SearchComponent);
