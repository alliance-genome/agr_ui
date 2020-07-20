import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setPageLoading } from '../actions/loadingActions';
import fetchData from '../lib/fetchData';

export default function usePageLoadingQuery(url) {
  const dispatch = useDispatch();
  return useQuery(url, () => {
    dispatch(setPageLoading(true));
    return fetchData(url)
      .finally(() => dispatch(setPageLoading(false)));
  }, {
    staleTime: Infinity,
  });
}
