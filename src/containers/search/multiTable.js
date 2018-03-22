/*eslint-disable react/sort-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMemoryHistory, Link } from 'react-router';
import clone from 'lodash.clone';

import style from './style.css';
import ResultsTable from './resultsTable';
import CategoryLabel from './categoryLabel';
import fetchData from '../../lib/fetchData';
import { SEARCH_API_ERROR_MESSAGE } from '../../constants';
import { receiveResponse, setError, setPending } from '../../actions/search';
import { getQueryParamWithValueChanged } from '../../lib/searchHelpers';


import {
  selectQueryParams,
  selectGeneResults,
  selectGoResults,
  selectDiseaseResults,
  selectAlleleResults,
  selectGeneTotal,
  selectGoTotal,
  selectDiseaseTotal,
  selectAlleleTotal,
  selectHomologyGroupTotal,
} from '../../selectors/searchSelectors';

const BASE_SEARCH_URL = '/api/search';
const PAGE_SIZE = 5;
//todo: ideally this would come from constants.js, but we don't want 'all'
const CATEGORIES = ['gene', 'go', 'disease', 'allele'];
const SEARCH_PATH = '/search';


class MultiTableComponent extends Component {
  componentDidMount() {
    this.fetchAllData();
  }

  // fetch data whenever URL changes within /search
  componentDidUpdate (prevProps) {
    if (prevProps.queryParams !== this.props.queryParams) {
      this.fetchAllData();
    }
  }

  getUrlByCategory(category) {
    let size = PAGE_SIZE;
    let currentPage = 1;
    let _limit = size;
    let _offset = (currentPage - 1) * size;
    let qp = clone(this.props.queryParams);
    qp.limit = _limit;
    qp.offset = _offset;
    qp.category = category;
    let tempHistory = createMemoryHistory('/');
    let searchUrl = tempHistory.createPath({ pathname: BASE_SEARCH_URL, query: qp });
    return searchUrl;
  }

  fetchAllData() {
    let geneUrl = this.getUrlByCategory('gene');
    let goUrl = this.getUrlByCategory('go');
    let diseaseUrl = this.getUrlByCategory('disease');
    let alleleUrl = this.getUrlByCategory('allele');
    this.props.dispatch(setPending(true));
    fetchData(geneUrl)
      .then( (geneData) => {
        this.props.dispatch(receiveResponse(geneData, this.props.queryParams, 'gene'));
      }).then(
      fetchData(goUrl)
        .then( (goData) => {
          this.props.dispatch(receiveResponse(goData, this.props.queryParams, 'go'));
        })).then(
      fetchData(diseaseUrl)
        .then( (diseaseData) => {
          this.props.dispatch(receiveResponse(diseaseData, this.props.queryParams, 'disease'));
        })).then(
      fetchData(alleleUrl)
        .then( (alleleData) => {
          this.props.dispatch(receiveResponse(alleleData, this.props.queryParams, 'allele'));
        })
      )
      .catch( (e) => {
        this.props.dispatch(setPending(false));
        if (process.env.NODE_ENV === 'production') {
          this.props.dispatch(setError(SEARCH_API_ERROR_MESSAGE));
        } else {
          throw(e);
        }
      });
  }



  //there has to be a better way to do this...
  getTotalForCategory(category) {
    if (category == 'gene') { return this.props.geneTotal.toLocaleString(); }
    if (category == 'go') { return this.props.goTotal.toLocaleString(); }
    if (category == 'disease') { return this.props.diseaseTotal.toLocaleString(); }
    if (category == 'allele') { return this.props.alleleTotal.toLocaleString(); }
  }

  //there also has to be a better way to do this...
  getResultsForCategory(category) {
    if (category == 'gene') { return this.props.geneResults; }
    if (category == 'go') { return this.props.goResults; }
    if (category == 'disease') { return this.props.diseaseResults; }
    if (category == 'allele') { return this.props.alleleResults;}
  }

  renderCategory(category) {
    let categoryQp = getQueryParamWithValueChanged('category', category, this.props.queryParams);
    let categoryHref = { pathname: SEARCH_PATH, query: categoryQp };

    if (this.getTotalForCategory(category) === '0') { return null; }

    return (
      <div>
        <p>
          <Link to={categoryHref}>
            {this.getTotalForCategory(category)} <CategoryLabel category={category} /> Results
          </Link>
        </p>
        <ResultsTable activeCategory={category} entries={this.getResultsForCategory(category)} />
        <span className='pull-right'>
          <Link to={categoryHref}>
            Show All <CategoryLabel category={category} hideImage /> Results
          </Link>
        </span>
        <hr className={style.clear} />
      </div>
    );

  }

  render() {
    return (
      <div className={style.resultContainer}>
        {CATEGORIES.map((category) => this.renderCategory(category))}
      </div>
    );
  }
}

MultiTableComponent.propTypes = {
  dispatch: PropTypes.func,
  queryParams: PropTypes.object,
  geneResults: PropTypes.array,
  goResults: PropTypes.array,
  diseaseResults: PropTypes.array,
  alleleResults: PropTypes.array,
  geneTotal: PropTypes.number,
  goTotal: PropTypes.number,
  diseaseTotal: PropTypes.number,
  alleleTotal: PropTypes.number,
  homologyGroupTotal: PropTypes.number
};

function mapStateToProps(state) {
  return {
    queryParams: selectQueryParams(state),
    geneResults: selectGeneResults(state),
    goResults: selectGoResults(state),
    diseaseResults: selectDiseaseResults(state),
    alleleResults: selectAlleleResults(state),
    geneTotal: selectGeneTotal(state),
    goTotal: selectGoTotal(state),
    diseaseTotal: selectDiseaseTotal(state),
    alleleTotal: selectAlleleTotal(state),
    homologyGroupTotal: selectHomologyGroupTotal(state),
  };
}

export { MultiTableComponent as MultiTableComponent };
export default connect(mapStateToProps)(MultiTableComponent);
