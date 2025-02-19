import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setPageLoading } from '../actions/loadingActions';
import fetchData from '../lib/fetchData';

export default function usePageLoadingQuery(url, fetchFn = fetchData) {
  const dispatch = useDispatch();
  return useQuery([url], () => {
    dispatch(setPageLoading(true));
    return fetchFn(url)
      .finally(() => dispatch(setPageLoading(false)));
  });
}
