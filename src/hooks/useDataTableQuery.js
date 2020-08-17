import {DEFAULT_TABLE_STATE} from '../constants';
import {usePaginatedQuery} from 'react-query';
import fetchData from '../lib/fetchData';
import {buildTableQueryString} from '../lib/utils';
import { useEffect, useReducer } from 'react';

// when the baseUrl changes, the page should go back to 1 (this can happen when
// the selected cell of a ribbon changes, for example). but we want the url
// change and the page change to happen in one update so that only one request
// is fired. therefore we need to use useReducer here instead of useState.

function reducer(state, action) {
  switch (action.type) {
  case 'reset':
    return {
      url: action.payload,
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
}

function getFullUrl(baseUrl, tableState) {
  if (!baseUrl) {
    return null;
  }
  const separator = baseUrl.indexOf('?') < 0 ? '?' : '&';
  return baseUrl + separator + buildTableQueryString(tableState);
}

export default function useDataTableQuery(baseUrl, config, initialTableState) {
  const initialState = {
    url: null,
    tableState: initialTableState || DEFAULT_TABLE_STATE,
  };
  const [{ url, tableState }, dispatch] = useReducer(reducer, initialState);
  const enabledBoolean = Boolean((config && config.hasOwnProperty('enabled')) ? config.enabled : true);
  useEffect(() => {
    dispatch({type: 'reset', payload: enabledBoolean && baseUrl});
  }, [baseUrl, enabledBoolean]);
  const setTableState = tableState => dispatch({type: 'update', payload: tableState});
  const query = usePaginatedQuery(
    [url, tableState],
    () => fetchData(getFullUrl(url, tableState)),
    config
  );
  return {
    ...query,
    data: query.resolvedData ? query.resolvedData.results : [],
    setTableState,
    tableState,
    totalRows: query.resolvedData ? query.resolvedData.total : 0,
  };
}
