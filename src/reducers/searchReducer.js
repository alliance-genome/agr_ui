/*eslint-disable no-case-declarations */
import { fromJS } from 'immutable';

import { parseAggs, parseResults } from './searchParsers';

const DEFAULT_PAGE_SIZE = 50;
const DEFAULT_STATE = fromJS({
  activeCategory: 'none',
  aggregations: [],
  errorMessage: '',
  isError: false,
  isPending: false,
  isReady: false,
  pageSize: DEFAULT_PAGE_SIZE,
  // for multi table
  geneResults: [],
  goResults: [],
  diseaseResults: [],
  geneTotal: 0,
  goTotal: 0,
  diseaseTotal: 0,
  homologyGroupTotal: 0,
  // mixed
  results: [],
  total: 0,
});

const searchReducer = function (state = DEFAULT_STATE, action) {
  // TODO cleanup fromJS/toJS handling here.
  switch(action.type) {
  case 'SEARCH_ERROR':
    if (!action.payload) {
      return state.set('errorMessage', '').set('isError', false);
    }
    return state.set('errorMessage', action.payload).set('isError', true);
  case 'SEARCH_SET_PENDING':
    return state.set('isPending', action.payload);
  case '@@router/LOCATION_CHANGE':
    // update active cat
    let newActiveCat = action.payload.query.category || 'none';
    // parse aggs to update active state during route change
    return state.set('aggregations', fromJS(parseAggs(state.get('aggregations').toJS(), action.payload.query)))
                .set('activeCategory', newActiveCat);
  case 'SEARCH_RESPONSE':
    let actionCat = action.category || 'none';
    let resultsTargetsVals = {
      'gene': 'geneResults',
      'go': 'goResults',
      'disease': 'diseaseResults',
      'none': 'results'
    };
    let totalTargetsVals = {
      'gene': 'geneTotal',
      'go': 'goTotal',
      'disease': 'diseaseTotal',
      'homology_group':  'homologyGroupTotal',
      'none': 'total'
    };
    let resultsTarget = resultsTargetsVals[actionCat] || 'results';
    let totalTarget = totalTargetsVals[actionCat] || 'total';
    // maybe parse aggs
    let newAggs = (actionCat === 'none') ? fromJS(parseAggs(action.payload.aggregations, action.queryParams)) : state.get('aggregations');
    // parse meta
    return state
      .set('isPending', false)
      .set(totalTarget, action.payload.total)
      .set('aggregations', newAggs)
      .set('isReady', true)
      // parse results
      .set(resultsTarget, fromJS(parseResults(action.payload.results)));
  default:
    return state;
  }
};

export default searchReducer;
