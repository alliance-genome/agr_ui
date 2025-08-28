import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

import style from './style.module.scss';
import { getQueryParamWithValueChanged, stringifyQuery } from '../../lib/searchHelpers.jsx';

import { selectTotalPages } from '../../selectors/searchSelectors';

const SEARCH_PATH = '/search';

const SearchControlsComponent = (props) => {
  let curPage = props.currentPage;
  let totPage = props.totalPages;
  let nextPage = Math.min(props.totalPages, curPage + 1);
  let prevPage = Math.max(1, curPage - 1);
  let prevQp = getQueryParamWithValueChanged('page', prevPage, props.queryParams);
  let nextQp = getQueryParamWithValueChanged('page', nextPage, props.queryParams);
  let prevHef = { pathname: SEARCH_PATH, search: stringifyQuery(prevQp) };
  let nextHef = { pathname: SEARCH_PATH, search: stringifyQuery(nextQp) };
  let isPrevDisabled = curPage <= 1;
  let isNextDisabled = curPage >= totPage;

  return (
    <div className="d-flex align-items-baseline justify-content-end">
      <label className={`${style.searchLabel}`}>
        Page {curPage.toLocaleString()} of {totPage.toLocaleString()}
      </label>
      <div className="btn-group" role="group">
        <Link className={`btn btn-outline-secondary${isPrevDisabled ? ' disabled' : ''}`} to={prevHef}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <Link className={`btn btn-outline-secondary${isNextDisabled ? ' disabled' : ''}`} to={nextHef}>
          <FontAwesomeIcon icon={faChevronRight} />
        </Link>
      </div>
    </div>
  );
};

SearchControlsComponent.propTypes = {
  currentPage: PropTypes.number,
  mode: PropTypes.string,
  queryParams: PropTypes.object,
  totalPages: PropTypes.number,
};

function mapStateToProps(state, ownProps) {
  const _queryParams = ownProps.queryParams;
  let _mode = _queryParams.mode;
  if (!_mode || _mode === 'graph') {
    _mode = 'list';
  }
  return {
    currentPage: parseInt(_queryParams.page) || 1,
    mode: _mode,
    totalPages: selectTotalPages(state),
  };
}

export { SearchControlsComponent };
export default connect(mapStateToProps)(SearchControlsComponent);
