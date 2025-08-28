import { buildTableQueryString } from '../lib/utils';

export function getFullUrl(baseUrl, tableState) {
  if (!baseUrl) {
    return null;
  }
  const separator = baseUrl.indexOf('?') < 0 ? '?' : '&';
  return baseUrl + separator + buildTableQueryString(tableState);
}

export function createBaseReducer(resetHandler) {
  return function reducer(state, action) {
    switch (action.type) {
      case 'reset':
        return {
          ...resetHandler(action.payload),
          tableState: {
            ...state.tableState,
            page: 1,
          },
        };
      case 'update':
        return {
          ...state,
          tableState: action.payload,
        };
      default:
        return state;
    }
  };
}

export function createQueryResult(query) {
  return {
    ...query,
    data: query?.data?.results || [],
    supplementalData: query?.data?.supplementalData || {},
    totalRows: query.data ? query.data.total : 0,
  };
}

export function getEnabledBoolean(config) {
  return Boolean(config && config.hasOwnProperty('enabled') ? config.enabled : true);
}
