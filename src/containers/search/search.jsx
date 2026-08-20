import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clone from 'lodash.clone';
import { stringifyQuery } from '../../lib/searchHelpers.jsx';
import { useLocation } from 'react-router-dom';

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

import {
  selectActiveCategory,
  selectErrorMessage,
  selectIsError,
  selectIsReady,
  selectQueryParams,
  selectResults,
  selectPageSize,
} from '../../selectors/searchSelectors';
import { setPageLoading } from '../../actions/loadingActions';
import TotalCount from './TotalCount.jsx';
import SearchBarComponent from '../layout/searchBar/index.jsx';

const BASE_SEARCH_URL = '/api/search';

const SearchComponent = ({
  activeCategory,
  currentPage,
  dispatch,
  errorMessage,
  isError,
  isMultiTable,
  isReady,
  isTable,
  location,
  pageSize,
  queryParams,
  results,
}) => {
  const fetchSearchData = () => {
    const qp = clone(queryParams);
    qp.limit = pageSize;
    qp.offset = (currentPage - 1) * pageSize;
    const searchUrl = `${BASE_SEARCH_URL}?${stringifyQuery(qp)}`;
    dispatch(setPageLoading(true));
    fetchData(searchUrl, undefined, 60000)
      .then((data) => {
        dispatch(receiveResponse(data, queryParams));
        dispatch(setError(false));
        dispatch(setPageLoading(false));
      })
      .catch((e) => {
        dispatch(setPageLoading(false));
        if (process.env.NODE_ENV === 'production') {
          dispatch(setError(SEARCH_API_ERROR_MESSAGE));
        } else {
          throw e;
        }
      });
  };

  // Fetch on mount + whenever location changes (matches previous
  // componentDidUpdate check on prevProps.location !== this.props.location)
  const prevLocationRef = useRef(null);
  useEffect(() => {
    if (prevLocationRef.current !== location) {
      prevLocationRef.current = location;
      fetchSearchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const renderResultsNode = () => {
    if (isMultiTable) return <MultiTable queryParams={queryParams} />;
    if (isTable) {
      return <ResultsTable activeCategory={activeCategory} entries={results} query={queryParams.q} />;
    }
    return <ResultsList entries={results} />;
  };

  const renderErrorNode = () => {
    if (!isError) return null;
    return (
      <div className="alert alert-warning">
        <h3>Oops, Error</h3>
        <p>{errorMessage}</p>
      </div>
    );
  };

  const title = 'Search ' + (queryParams.q || '');
  return (
    <>
      <HeadMetaTags title={title} />

      <div className={`${style.searchBarBackground} shadow-sm`}>
        <div className="container">
          <div className={style.searchBarContainer}>
            <SearchBarComponent />
          </div>
        </div>
      </div>

      <div className="container">
        {renderErrorNode()}

        {!isReady && <LoadingPage />}

        {isReady && (
          <div className="row mb-3">
            <div className={SMALL_COL_CLASS}>
              <FilterSelector queryParams={queryParams} />
            </div>
            <div className={LARGE_COL_CLASS}>
              <div className="d-flex justify-content-between align-items-baseline">
                <span>
                  <TotalCount /> results{' '}
                  {queryParams.q && (
                    <span>
                      for <b>{queryParams.q}</b>
                    </span>
                  )}
                </span>
                <SearchControls queryParams={queryParams} />
              </div>
              <SearchBreadcrumbs queryParams={queryParams} />
              {renderResultsNode()}
              <SearchControls queryParams={queryParams} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

SearchComponent.propTypes = {
  activeCategory: PropTypes.string,
  currentPage: PropTypes.number,
  dispatch: PropTypes.func,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  isMultiTable: PropTypes.bool,
  isReady: PropTypes.bool,
  isTable: PropTypes.bool,
  location: PropTypes.object.isRequired,
  pageSize: PropTypes.number,
  queryParams: PropTypes.object,
  results: PropTypes.array,
};

function mapStateToProps(state, ownProps) {
  const _queryParams = selectQueryParams(state, ownProps);
  const _mode = _queryParams.mode;
  const _isTable = _mode === 'table';
  const _currentPage = parseInt(_queryParams.page) || 1;
  const _activeCategory = selectActiveCategory(state);
  const _isMultiTable = _isTable && _activeCategory === 'none';
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
    results: selectResults(state),
  };
}

const ConnectedSearchComponent = connect(mapStateToProps)(SearchComponent);

// mapStateToProps' selectors (selectQueryParams -> selectRoutingDomain) read
// props.location.search from the connected component's ownProps, so we inject
// the router location before connect runs.
const SearchComponentWithLocation = (props) => {
  const location = useLocation();
  return <ConnectedSearchComponent {...props} location={location} />;
};

export { SearchComponent, SearchComponentWithLocation };
export default SearchComponentWithLocation;
