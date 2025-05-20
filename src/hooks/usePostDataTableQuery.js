import { DEFAULT_TABLE_STATE } from '../constants';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';
import { useEffect, useReducer } from 'react';
import { getFullUrl, createBaseReducer, createQueryResult, getEnabledBoolean } from './utils';

const reducer = createBaseReducer(url => ({ url }));

export default function usePostDataTableQuery(baseUrl, body, config, initialTableState, fetchTimeout) {
  const initialState = {
    url: null,
    tableState: { ...DEFAULT_TABLE_STATE, ...(initialTableState || {}) },
  };
  const [{ url, tableState }, dispatch] = useReducer(reducer, initialState);
  const enabledBoolean = getEnabledBoolean(config);

  useEffect(() => {
    dispatch({ type: 'reset', payload: enabledBoolean && baseUrl });
  }, [baseUrl, enabledBoolean]);

  const setTableState = tableState => dispatch({ type: 'update', payload: tableState });

  const query = useQuery({
    queryKey: [url, body, tableState],
    queryFn: () => fetchData(
      getFullUrl(url, tableState),
      {
        type: 'POST',
        data: body
      },
      fetchTimeout
    ),
    keepPreviousData: true,
    staleTime: 30000,
    ...config
  });

  return {
    ...createQueryResult(query),
    setTableState,
    tableState,
  };
}
