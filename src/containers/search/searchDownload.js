import React, { Component } from 'react';
import PropTypes from 'prop-types';

import fetchData from '../../lib/fetchData';
import clone from 'lodash.clone';
import {ParseJSONToCSV} from '../../lib/searchJSONConvertor';
const BASE_SEARCH_URL = '/api/search';
import {stringifyQuery } from '../../lib/searchHelpers';

class SearchDownload extends Component {
  constructor(){
    super();
    this.handleBtnOnClick = this.handleBtnOnClick.bind(this);
  }

  handleBtnOnClick(){
    let qp = clone(this.props.queryParams);
    //es max is at 10k
    let _limit = 200;
    let _offset = 0;

    qp.limit = _limit;
    qp.offset = _offset;
    let qString = `${BASE_SEARCH_URL}?${stringifyQuery(qp)}`;
    fetchData(qString).then((searchData) => {
      ParseJSONToCSV(searchData.results, qp.category);
    });

  }
  render(){
    return (<button
      className='btn btn-outline-secondary btn-sm'
      onClick={ this.handleBtnOnClick}
      type='button'
    >
      <i className="fa fa-download" aria-hidden="true" />
      <span>&nbsp;download</span>
    </button>);

  }

}

SearchDownload.propTypes = {
  queryParams: PropTypes.object
};

export default SearchDownload;
