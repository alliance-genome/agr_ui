import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clone from 'lodash.clone';

import style from './style.module.scss';
import ResultsTable from './resultsTable.jsx';
import CategoryLabel from './categoryLabel.jsx';
import fetchData from '../../lib/fetchData';
import {
  ALLELE_VARIANT_CATEGORY,
  DISEASE_CATEGORY,
  GENE_CATEGORY,
  GO_CATEGORY,
  SEARCH_API_ERROR_MESSAGE,
} from '../../constants';
import { receiveResponse, setError } from '../../actions/search';
import { getQueryParamWithValueChanged, stringifyQuery } from '../../lib/searchHelpers.jsx';

import {
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
import { setPageLoading } from '../../actions/loadingActions';

const BASE_SEARCH_URL = '/api/search';
const PAGE_SIZE = 5;
//todo: ideally this would come from constants.js, but we don't want 'all'
const CATEGORIES = [GENE_CATEGORY, GO_CATEGORY, DISEASE_CATEGORY, ALLELE_VARIANT_CATEGORY];
const SEARCH_PATH = '/search';

class MultiTableComponent extends Component {
  componentDidMount() {
    this.fetchAllData();
  }

  // fetch data whenever URL changes within /search
  componentDidUpdate(prevProps) {
    if (stringifyQuery(prevProps.queryParams) !== stringifyQuery(this.props.queryParams)) {
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
    return `${BASE_SEARCH_URL}?${stringifyQuery(qp)}`;
  }

  fetchAllData() {
    let geneUrl = this.getUrlByCategory(GENE_CATEGORY);
    let goUrl = this.getUrlByCategory(GO_CATEGORY);
    let diseaseUrl = this.getUrlByCategory(DISEASE_CATEGORY);
    let alleleUrl = this.getUrlByCategory(ALLELE_VARIANT_CATEGORY);
    this.props.dispatch(setPageLoading(true));
    fetchData(geneUrl)
      .then((geneData) => {
        this.props.dispatch(receiveResponse(geneData, this.props.queryParams, GENE_CATEGORY));
      })
      .then(
        fetchData(goUrl).then((goData) => {
          this.props.dispatch(receiveResponse(goData, this.props.queryParams, GO_CATEGORY));
        })
      )
      .then(
        fetchData(diseaseUrl).then((diseaseData) => {
          this.props.dispatch(receiveResponse(diseaseData, this.props.queryParams, DISEASE_CATEGORY));
        })
      )
      .then(
        fetchData(alleleUrl).then((alleleData) => {
          this.props.dispatch(receiveResponse(alleleData, this.props.queryParams, ALLELE_VARIANT_CATEGORY));
        })
      )
      .catch((e) => {
        this.props.dispatch(setPageLoading(false));
        if (process.env.NODE_ENV === 'production') {
          this.props.dispatch(setError(SEARCH_API_ERROR_MESSAGE));
        } else {
          throw e;
        }
      });
  }

  //there has to be a better way to do this...
  getTotalForCategory(category) {
    if (category === GENE_CATEGORY) {
      return this.props.geneTotal.toLocaleString();
    }
    if (category === GO_CATEGORY) {
      return this.props.goTotal.toLocaleString();
    }
    if (category === DISEASE_CATEGORY) {
      return this.props.diseaseTotal.toLocaleString();
    }
    if (category === ALLELE_VARIANT_CATEGORY) {
      return this.props.alleleTotal.toLocaleString();
    }
  }

  //there also has to be a better way to do this...
  getResultsForCategory(category) {
    if (category === GENE_CATEGORY) {
      return this.props.geneResults;
    }
    if (category === GO_CATEGORY) {
      return this.props.goResults;
    }
    if (category === DISEASE_CATEGORY) {
      return this.props.diseaseResults;
    }
    if (category === ALLELE_VARIANT_CATEGORY) {
      return this.props.alleleResults;
    }
  }

  renderCategory(category, key) {
    let categoryQp = getQueryParamWithValueChanged('category', category, this.props.queryParams);
    let categoryHref = { pathname: SEARCH_PATH, search: stringifyQuery(categoryQp) };

    if (this.getTotalForCategory(category) === '0') {
      return null;
    }

    return (
      <div key={key}>
        <p>
          <Link to={categoryHref}>
            {this.getTotalForCategory(category)} <CategoryLabel category={category} /> Results
          </Link>
        </p>
        <ResultsTable activeCategory={category} entries={this.getResultsForCategory(category)} />
        <span className="float-right">
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
        {CATEGORIES.map((category, idx) => this.renderCategory(category, idx))}
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
  homologyGroupTotal: PropTypes.number,
};

function mapStateToProps(state) {
  return {
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

export { MultiTableComponent };
export default connect(mapStateToProps)(MultiTableComponent);
