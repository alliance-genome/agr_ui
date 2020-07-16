import {DEFAULT_TABLE_STATE} from '../constants';
import {usePaginatedQuery} from 'react-query';
import fetchData from '../lib/fetchData';
import {buildTableQueryString} from '../lib/utils';
import {useState} from 'react';

export default function useDataTableQuery(url) {
  const [tableState, setTableState] = useState(DEFAULT_TABLE_STATE);
  const separator = url.indexOf('?') < 0 ? '?' : '&';
  const query = usePaginatedQuery(
    [url, tableState],
    () => fetchData(url + separator + buildTableQueryString(tableState)),
    {staleTime: Infinity}
  );
  return {
    ...query,
    tableState,
    setTableState
  };
}
