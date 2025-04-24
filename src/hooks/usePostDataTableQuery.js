import { DEFAULT_TABLE_STATE } from '../constants';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';
import { useEffect, useReducer, useRef } from 'react';
import { getFullUrl, createBaseReducer, createQueryResult, getEnabledBoolean } from './utils';

const reducer = createBaseReducer((payload) => ({
  url: payload.url,
  body: payload.body
}));

export default function usePostDataTableQuery(baseUrl, body, config, initialTableState, fetchTimeout) {
  const initialState = {
    url: null,
    body: null,
    tableState: { ...DEFAULT_TABLE_STATE, ...(initialTableState || {}) },
  };
  const [{ url, body: currentBody, tableState }, dispatch] = useReducer(reducer, initialState);
  const enabledBoolean = getEnabledBoolean(config);
  const timeoutRef = useRef(null);

  //the timeout prevents unnecessary calls to the API on initial render
  useEffect(() => {
    clearTimeout(timeoutRef.current);
    
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
      staleTime: 30000, 
      ...config,
    }
  );

  return {
    ...createQueryResult(query),
    setTableState,
    tableState,
  };
}