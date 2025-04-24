import { DEFAULT_TABLE_STATE } from '../constants';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';
import { buildTableQueryString } from '../lib/utils';
import { useEffect, useReducer, useRef } from 'react';

function reducer(state, action) {
  switch (action.type) {
  case 'reset':
    return {
      url: action.payload.url,
      body: action.payload.body,
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

export default function usePostDataTableQuery(baseUrl, body, config, initialTableState, fetchTimeout) {
  const initialState = {
    url: null,
    body: null,
    tableState: { ...DEFAULT_TABLE_STATE, ...(initialTableState || {}) },
  };
  const [{ url, body: currentBody, tableState }, dispatch] = useReducer(reducer, initialState);
  const enabledBoolean = Boolean((config && config.hasOwnProperty('enabled')) ? config.enabled : true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    
    // Debounce the reset action by 300ms
    timeoutRef.current = setTimeout(() => {
      dispatch({ 
        type: 'reset', 
        payload: {
          url: enabledBoolean && baseUrl,
          body
        }
      });
    }, 300);

    return () => clearTimeout(timeoutRef.current);
  }, [baseUrl, body, enabledBoolean]);

  const setTableState = tableState => dispatch({ type: 'update', payload: tableState });

  const query = useQuery(
    [url, currentBody, tableState],
    () => fetchData(
      getFullUrl(url, tableState),
      {
        type: 'POST',
        data: currentBody
      },
      fetchTimeout
    ),
    {
      keepPreviousData: true,
      staleTime: 30000, // Consider data fresh for 30 seconds
      ...config,
    }
  );

  return {
    ...query,
    data: query?.data?.results || [],
    supplementalData: query?.data?.supplementalData || {},
    setTableState,
    tableState,
    totalRows: query.data ? query.data.total : 0,
  };
}