import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import clone from 'lodash.clone';

import style from './style.module.scss';
import ResultsTable from './resultsTable.jsx';
import CategoryLabel from './categoryLabel.jsx';
import fetchData from '../../lib/fetchData';
import {
  ALLELE_CATEGORY,
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
const CATEGORIES = [GENE_CATEGORY, GO_CATEGORY, DISEASE_CATEGORY, ALLELE_CATEGORY];
const SEARCH_PATH = '/search';

const MultiTableComponent = (props) => {
  const {
    dispatch,
    queryParams,
    geneResults,
    goResults,
    diseaseResults,
    alleleResults,
    geneTotal,
    goTotal,
    diseaseTotal,
    alleleTotal,
  } = props;

  const getUrlByCategory = (category) => {
    const qp = clone(queryParams);
    qp.limit = PAGE_SIZE;
    qp.offset = 0;
    qp.category = category;
    return `${BASE_SEARCH_URL}?${stringifyQuery(qp)}`;
  };

  const fetchAllData = () => {
    const geneUrl = getUrlByCategory(GENE_CATEGORY);
    const goUrl = getUrlByCategory(GO_CATEGORY);
    const diseaseUrl = getUrlByCategory(DISEASE_CATEGORY);
    const alleleUrl = getUrlByCategory(ALLELE_CATEGORY);
    dispatch(setPageLoading(true));
    fetchData(geneUrl)
      .then((geneData) => {
        dispatch(receiveResponse(geneData, queryParams, GENE_CATEGORY));
      })
      .then(
        fetchData(goUrl).then((goData) => {
          dispatch(receiveResponse(goData, queryParams, GO_CATEGORY));
        })
      )
      .then(
        fetchData(diseaseUrl).then((diseaseData) => {
          dispatch(receiveResponse(diseaseData, queryParams, DISEASE_CATEGORY));
        })
      )
      .then(
        fetchData(alleleUrl).then((alleleData) => {
          dispatch(receiveResponse(alleleData, queryParams, ALLELE_CATEGORY));
        })
      )
      .catch((e) => {
        dispatch(setPageLoading(false));
        if (process.env.NODE_ENV === 'production') {
          dispatch(setError(SEARCH_API_ERROR_MESSAGE));
        } else {
          throw e;
        }
      });
  };

  // fetch data whenever URL changes within /search (mount + queryParams change)
  const queryKey = stringifyQuery(queryParams);
  const prevQueryKeyRef = useRef(null);
  useEffect(() => {
    if (prevQueryKeyRef.current !== queryKey) {
      prevQueryKeyRef.current = queryKey;
      fetchAllData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryKey]);

  const getTotalForCategory = (category) => {
    if (category === GENE_CATEGORY) return geneTotal.toLocaleString();
    if (category === GO_CATEGORY) return goTotal.toLocaleString();
    if (category === DISEASE_CATEGORY) return diseaseTotal.toLocaleString();
    if (category === ALLELE_CATEGORY) return alleleTotal.toLocaleString();
  };

  const getResultsForCategory = (category) => {
    if (category === GENE_CATEGORY) return geneResults;
    if (category === GO_CATEGORY) return goResults;
    if (category === DISEASE_CATEGORY) return diseaseResults;
    if (category === ALLELE_CATEGORY) return alleleResults;
  };

  const renderCategory = (category, key) => {
    const categoryQp = getQueryParamWithValueChanged('category', category, queryParams);
    const categoryHref = { pathname: SEARCH_PATH, search: stringifyQuery(categoryQp) };

    if (getTotalForCategory(category) === '0') return null;

    return (
      <div key={key}>
        <p>
          <Link to={categoryHref}>
            {getTotalForCategory(category)} <CategoryLabel category={category} /> Results
          </Link>
        </p>
        <ResultsTable activeCategory={category} entries={getResultsForCategory(category)} />
        <span className="float-right">
          <Link to={categoryHref}>
            Show All <CategoryLabel category={category} hideImage /> Results
          </Link>
        </span>
        <hr className={style.clear} />
      </div>
    );
  };

  return <div className={style.resultContainer}>{CATEGORIES.map((c, i) => renderCategory(c, i))}</div>;
};

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
