import { DEFAULT_TABLE_STATE } from '../constants';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';
import { useEffect, useReducer, useRef } from 'react';
import { getFullUrl, createBaseReducer, createQueryResult, getEnabledBoolean } from './utils';

// Keep the reducer simple like useDataTableQuery
const reducer = createBaseReducer(url => ({ url }));

export default function usePostDataTableQuery(baseUrl, body, config, initialTableState, fetchTimeout) {
  const initialState = {
    url: null,
    tableState: { ...DEFAULT_TABLE_STATE, ...(initialTableState || {}) },
  };
  const [{ url, tableState }, dispatch] = useReducer(reducer, initialState);
  const enabledBoolean = getEnabledBoolean(config);
  const bodyRef = useRef(body);
  const timeoutRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    bodyRef.current = body;
    
    timeoutRef.current = setTimeout(() => {
      dispatch({ 
        type: 'reset', 
        payload: enabledBoolean && baseUrl
      });
    }, 300);

    return () => clearTimeout(timeoutRef.current);
    // eslint-disable-next-line 
  }, [baseUrl, enabledBoolean]);

  const setTableState = tableState => dispatch({ type: 'update', payload: tableState });

  const query = useQuery(
    [url, body, tableState],
    () => fetchData(
      getFullUrl(url, tableState),
      {
        type: 'POST',
        data: body
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