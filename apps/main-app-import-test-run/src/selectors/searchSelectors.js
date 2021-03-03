import { createSelector } from 'reselect';
import { parseQueryString } from '../lib/searchHelpers';

// See https://github.com/reactjs/reselect
// for details on using selectors.

/**
 * Direct selector to the search state.
 */
export const selectSearchDomain = (state) => state.search;
export const selectRoutingDomain = (state, props) => {
  const {location} = props;
  return {
    location,
  };
};

export const selectSearch = createSelector(
  [selectSearchDomain],
  (searchDomain) => searchDomain.toJS()
);

export const selectErrorMessage = createSelector(
  [selectSearchDomain],
  (search) => search.get('errorMessage')
);

export const selectIsError = createSelector(
  [selectSearchDomain],
  (search) => search.get('isError')
);

export const selectIsReady = createSelector(
  [selectSearchDomain],
  (search) => search.get('isReady')
);

export const selectQueryParams = createSelector(
  [selectRoutingDomain],
  ({location}) => {
    return location.query || parseQueryString(location.search);
  }
);

export const selectGeneResults = createSelector(
  [selectSearchDomain],
  (search) => search.get('geneResults').toJS()
);

export const selectGoResults = createSelector(
  [selectSearchDomain],
  (search) => search.get('goResults').toJS()
);

export const selectDiseaseResults = createSelector(
  [selectSearchDomain],
  (search) => search.get('diseaseResults').toJS()
);

export const selectAlleleResults = createSelector(
  [selectSearchDomain],
  (search) => search.get('alleleResults').toJS()
);

export const selectHomologyGroupResults = createSelector(
  [selectSearchDomain],
  (search) => search.get('homologyGroupResults').toJS()
);

export const selectGeneTotal = createSelector(
  [selectSearchDomain],
  (search) => search.get('geneTotal')
);

export const selectGoTotal = createSelector(
  [selectSearchDomain],
  (search) => search.get('goTotal')
);

export const selectDiseaseTotal = createSelector(
  [selectSearchDomain],
  (search) => search.get('diseaseTotal')
);

export const selectAlleleTotal = createSelector(
  [selectSearchDomain],
  (search) => search.get('alleleTotal')
);

export const selectHomologyGroupTotal = createSelector(
  [selectSearchDomain],
  (search) => search.get('homologyGroupTotal')
);

export const selectResults = createSelector(
  [selectSearchDomain],
  (search) => search.get('results').toJS()
);

export const selectTotal = createSelector(
  [selectSearchDomain],
  (search) => search.get('total')
);

export const selectPageSize = createSelector(
  [selectSearchDomain],
  (search) => search.get('pageSize')
);

export const selectTotalPages = createSelector(
  [selectTotal,selectPageSize],
  (total, pageSize) => Math.floor(total / pageSize) + ((total % pageSize === 0) ? 0 : 1)
);

export const selectActiveCategory = createSelector(
  [selectSearchDomain],
  (search) => search.get('activeCategory')
);
export const selectAggregations = createSelector(
  [selectSearchDomain],
  (search) => search.get('aggregations').toJS()
);
