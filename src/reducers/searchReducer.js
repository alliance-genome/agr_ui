import { fromJS } from 'immutable';

import { ALLELE_CATEGORY, DISEASE_CATEGORY, GENE_CATEGORY, GO_CATEGORY } from '../constants';
import { parseAggs, parseResults } from './searchParsers';

const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_STATE = fromJS({
  activeCategory: 'none',
  aggregations: [],
  errorMessage: '',
  isError: false,
  isReady: false,
  pageSize: DEFAULT_PAGE_SIZE,
  // for multi table
  geneResults: [],
  goResults: [],
  diseaseResults: [],
  alleleResults: [],
  geneTotal: 0,
  goTotal: 0,
  diseaseTotal: 0,
  alleleTotal: 0,
  homologyGroupTotal: 0,
  // mixed
  results: [],
  total: 0,
});

const searchReducer = function (state = DEFAULT_STATE, action) {
  // TODO cleanup fromJS/toJS handling here.
  switch (action.type) {
    case 'SEARCH_ERROR':
      if (!action.payload) {
        return state.set('errorMessage', '').set('isError', false);
      }
      return state.set('errorMessage', action.payload).set('isError', true);
    case '@@router/LOCATION_CHANGE': {
      // update active cat
      let newActiveCat = action.payload.query.category || 'none';
      // parse aggs to update active state during route change
      return state
        .set('aggregations', fromJS(parseAggs(state.get('aggregations').toJS(), action.payload.query)))
        .set('activeCategory', newActiveCat);
    }
    case 'SEARCH_RESPONSE': {
      let actionCat = action.category || 'none';
      let resultsTargetsVals = {
        [GENE_CATEGORY]: 'geneResults',
        [GO_CATEGORY]: 'goResults',
        [DISEASE_CATEGORY]: 'diseaseResults',
        [ALLELE_CATEGORY]: 'alleleResults',
        none: 'results',
      };
      let totalTargetsVals = {
        [GENE_CATEGORY]: 'geneTotal',
        [GO_CATEGORY]: 'goTotal',
        [DISEASE_CATEGORY]: 'diseaseTotal',
        [ALLELE_CATEGORY]: 'alleleTotal',
        none: 'total',
      };
      let resultsTarget = resultsTargetsVals[actionCat] || 'results';
      let totalTarget = totalTargetsVals[actionCat] || 'total';
      // parse aggs from response; clear them when the API returns none
      let newAggs;
      if (actionCat === 'none') {
        let parsedAggs = parseAggs(action.payload.aggregations, action.queryParams);
        newAggs = fromJS(parsedAggs);
      } else {
        newAggs = state.get('aggregations');
      }
      // parse meta
      return (
        state
          .set(totalTarget, action.payload.total)
          .set('aggregations', newAggs)
          .set('activeCategory', action.queryParams.category || 'none')
          .set('isReady', true)
          // parse results
          .set(resultsTarget, fromJS(parseResults(action.payload.results)))
      );
    }
    default:
      return state;
  }
};

export default searchReducer;
