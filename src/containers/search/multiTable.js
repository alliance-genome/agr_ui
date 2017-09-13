/*eslint-disable react/sort-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createMemoryHistory, Link } from 'react-router';
import _ from 'underscore';

import style from './style.css';
import ResultsTable from './resultsTable';
import CategoryLabel from './categoryLabel';
import fetchData from '../../lib/fetchData';
import { SEARCH_API_ERROR_MESSAGE } from '../../constants';
import { receiveResponse, setError, setPending } from '../../actions/search';

import {
  selectQueryParams,
  selectGeneResults,
  selectGoResults,
  selectDiseaseResults,
  selectGeneTotal,
  selectGoTotal,
  selectDiseaseTotal,
  selectHomologyGroupTotal,
} from '../../selectors/searchSelectors';

const BASE_SEARCH_URL = '/api/search';
const PAGE_SIZE = 5;
const CATEGORIES = ['gene', 'go', 'disease'];


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
    let qp = _.clone(this.props.queryParams);
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
        }))
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
  }

  //there also has to be a better way to do this...
  getResultsForCategory(category) {
    if (category == 'gene') { return this.props.geneResults; }
    if (category == 'go') { return this.props.goResults; }
    if (category == 'disease') { return this.props.diseaseResults; }
  }

  renderCategory(category) {
    let categoryHref = this.getUrlByCategory(category);

    return (
      <div>
        <p>
          <Link to={categoryHref}>
            {this.getTotalForCategory(category)} <CategoryLabel category={category} />
          </Link>
        </p>
        <ResultsTable activeCategory={category} entries={this.getResultsForCategory(category)} />
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
  geneTotal: PropTypes.number,
  goTotal: PropTypes.number,
  diseaseTotal: PropTypes.number,
  homologyGroupTotal: PropTypes.number
};

function mapStateToProps(state) {
  return {
    queryParams: selectQueryParams(state),
    geneResults: selectGeneResults(state),
    goResults: selectGoResults(state),
    diseaseResults: selectDiseaseResults(state),
    geneTotal: selectGeneTotal(state),
    goTotal: selectGoTotal(state),
    diseaseTotal: selectDiseaseTotal(state),
    homologyGroupTotal: selectHomologyGroupTotal(state),
  };
}

export { MultiTableComponent as MultiTableComponent };
export default connect(mapStateToProps)(MultiTableComponent);
