import { useQuery } from '@tanstack/react-query';
import fetchData from '../../lib/fetchData';

// The count endpoints return a bare number. Keyed by url so the index page,
// which asks for the same counts from both the header buttons and the portal
// list, only fetches each one once and keeps it across navigations.
export function useEntityButtonCounts(url) {
  const { data } = useQuery({
    queryKey: ['disease-portal-entity-count', url],
    queryFn: () => fetchData(url),
    enabled: !!url,
  });

  return data;
}
