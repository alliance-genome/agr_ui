/*eslint-disable react/sort-prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createMemoryHistory } from 'react-router';
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

  renderGenes() {
    return (
      <div>
        <p>{this.props.geneTotal.toLocaleString()} <CategoryLabel category='gene' /></p>
        <ResultsTable activeCategory='gene' entries={this.props.geneResults} />
      </div>
    );
  }

  renderGo() {
    return (
      <div>
        <p>{this.props.goTotal.toLocaleString()} <CategoryLabel category='go' /></p>
        <ResultsTable activeCategory='go' entries={this.props.goResults} />
      </div>
    );
  }

  renderDisease() {
    return (
      <div>
        <p>{this.props.diseaseTotal.toLocaleString()} <CategoryLabel category='disease' /></p>
        <ResultsTable activeCategory='disease' entries={this.props.diseaseResults} />
      </div>
    );
  }

  render() {
    return (
      <div className={style.resultContainer}>
        {this.renderGenes()}
        {this.renderGo()}
      </div>
    );
  }
}

MultiTableComponent.propTypes = {
  dispatch: React.PropTypes.func,
  queryParams: React.PropTypes.object,
  geneResults: React.PropTypes.array,
  goResults: React.PropTypes.array,
  diseaseResults: React.PropTypes.array,
  geneTotal: React.PropTypes.number,
  goTotal: React.PropTypes.number,
  diseaseTotal: React.PropTypes.number,
  homologyGroupTotal: React.PropTypes.number
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
