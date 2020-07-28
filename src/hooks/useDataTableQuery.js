import {DEFAULT_TABLE_STATE} from '../constants';
import {usePaginatedQuery} from 'react-query';
import fetchData from '../lib/fetchData';
import {buildTableQueryString} from '../lib/utils';
import { useEffect, useReducer } from 'react';

// when the baseUrl changes, the page should go back to 1 (this can happen when
// the selected cell of a ribbon changes, for example). but we want the url
// change and the page change to happen in one update so that only one request
// is fired. therefore we need to use useReducer here instead of useState.

const initialState = {
  url: null,
  tableState: DEFAULT_TABLE_STATE,
};

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

export default function useDataTableQuery(baseUrl, config) {
  const [{ url, tableState }, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({type: 'reset', payload: baseUrl});
  }, [baseUrl]);
  const setTableState = tableState => dispatch({type: 'update', payload: tableState});
  let enabled = url !== null;
  if (config && 'enabled' in config) {
    enabled = enabled && config.enabled;
  }
  const separator = url && url.indexOf('?') < 0 ? '?' : '&';
  const query = usePaginatedQuery(
    [url, tableState],
    () => fetchData(url + separator + buildTableQueryString(tableState)),
    {
      staleTime: Infinity,
      ...config,
      enabled,
    }
  );
  return {
    ...query,
    tableState,
    setTableState
  };
}
