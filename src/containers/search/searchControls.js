import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { DropdownButton, MenuItem } from 'react-bootstrap';

import style from './style.css';
import { getQueryParamWithValueChanged } from '../../lib/searchHelpers';

import {
  selectActiveCategory,
  selectTotalPages,
  selectQueryParams
} from '../../selectors/searchSelectors';

const SEARCH_PATH = '/search';

class SearchControlsComponent extends Component {
  renderViewAs() {
    let listQp = getQueryParamWithValueChanged('mode', 'list', this.props.queryParams);
    let tableQp = getQueryParamWithValueChanged('mode', 'table', this.props.queryParams);
    let listHref = { pathname: SEARCH_PATH, query: listQp };
    let tableHref = { pathname: SEARCH_PATH, query: tableQp };
    return (
      <div className={style.control}>
        <label className={style.searchLabel}>View As</label>
        <div className='btn-group' role='group'>
          <Link className={`btn btn-${(this.props.mode === 'list') ? 'primary': 'secondary'}`} to={listHref}><i className='fa fa-list' /> List</Link>
          <Link className={`btn btn-${(this.props.mode === 'table') ? 'primary': 'secondary'}`} to={tableHref}><i className='fa fa-table' /> Table</Link>
        </div>
      </div>
    );
  }

  renderPaginator() {
    let curPage = this.props.currentPage;
    let totPage = this.props.totalPages;
    let nextPage = Math.min(this.props.totalPages, curPage + 1);
    let prevPage = Math.max(1, curPage - 1);
    let prevQp = getQueryParamWithValueChanged('page', prevPage, this.props.queryParams);
    let nextQp = getQueryParamWithValueChanged('page', nextPage, this.props.queryParams);
    let prevHef = { pathname: SEARCH_PATH, query: prevQp };
    let nextHef = { pathname: SEARCH_PATH, query: nextQp };
    let isPrevDisabled = curPage <= 1;
    let isNextDisabled = curPage >= totPage;
    return (
      <div className={style.control}>
        <label className={`${style.searchLabel}`}>Page {curPage.toLocaleString()} of {totPage.toLocaleString()}</label>
        <div className='btn-group' role='group'>
          <Link className={`btn btn-secondary${isPrevDisabled ? ' disabled' : ''}`} to={prevHef}><i className='fa fa-chevron-left' /></Link>
          <Link className={`btn btn-secondary${isNextDisabled ? ' disabled' : ''}`} to={nextHef}><i className='fa fa-chevron-right' /></Link>
        </div>
      </div>
    );
  }

  renderSortinator() {
    return (
      <div className={style.control}>
        <label className={style.searchLabel}>Sort By</label>
        <DropdownButton className='btn-secondary' id='bg-nested-dropdown' title='Relevance'>
          <MenuItem eventKey='1'>Dropdown link</MenuItem>
          <MenuItem eventKey='2'>Dropdown link</MenuItem>
        </DropdownButton>
      </div>
    );
  }

  renderPageSizeControl() {
    return (
      <div className={style.control}>
        <label className={style.searchLabel}>Page Size</label>
        <DropdownButton className='btn-secondary' id='bg-nested-dropdown' title='50'>
          <MenuItem eventKey='1'>Dropdown link</MenuItem>
          <MenuItem eventKey='2'>Dropdown link</MenuItem>
        </DropdownButton>
      </div>
    );
  }

  renderDownloadButton() {
    return (
      <div>
        <label className={style.searchLabel}>&nbsp;</label>
        <a className={`btn btn-secondary ${style.agrDownloadBtn}`} href='#'><i className='fa fa-download' /> Download</a>
      </div>
    );
  }

  renderNonViewAs() {
    if (this.props.isMultiTable) return null;
    return (
      <div className={style.controlContainer}>
        {this.renderPaginator()}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderViewAs()}
        {this.renderNonViewAs()}
      </div>
    );
  }
}

SearchControlsComponent.propTypes = {
  currentPage: PropTypes.number,
  isMultiTable: PropTypes.bool,
  mode: PropTypes.string,
  queryParams: PropTypes.object,
  totalPages: PropTypes.number
};

function mapStateToProps(state) {
  let _queryParams = selectQueryParams(state);
  let activeCategory = selectActiveCategory(state);
  let _mode = _queryParams.mode;
  if (!_mode || _mode === 'graph') {
    _mode = 'list';
  }
  let _isTable = (_queryParams.mode === 'table');
  let _isMultiTable = (_isTable && activeCategory === 'none') ;
  return {
    currentPage: parseInt(_queryParams.page) || 1,
    isMultiTable: _isMultiTable,
    mode: _mode,
    queryParams: _queryParams,
    totalPages: selectTotalPages(state)
  };
}

export { SearchControlsComponent as SearchControlsComponent };
export default connect(mapStateToProps)(SearchControlsComponent);
