import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';

/**
 * A simple hook that uses TanStack Query to fetch data only when enabled.
 * Designed for popup components that should only fetch data when opened.
 * 
 * @param {string} url - The API endpoint to fetch from
 * @param {boolean} enabled - Whether the query should be enabled/fired
 * @returns {object} Query result object with data, isLoading, error, etc.
 */
export default function usePopupQuery(url, enabled = false) {
  return useQuery({
    queryKey: [url],
    queryFn: () => fetchData(url),
    enabled: enabled && !!url,
  });
}
