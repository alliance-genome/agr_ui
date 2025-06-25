import { useQuery } from '@tanstack/react-query';
import fetchData from '../lib/fetchData';

/**
 * Hook for popup components that should only fetch data when opened.
 * 
 * @param {string} baseUrl - The base API endpoint to fetch from
 * @param {boolean} enabled - Whether the query should be enabled/fired
 * @param {object} pagination - Pagination parameters { page, limit }
 * @returns {object} Query result object with data, isLoading, error, etc.
 */
export default function usePopupQuery(baseUrl, enabled = false, pagination = { page: 1, limit: 10 }) {
  const { page, limit } = pagination;
  const url = baseUrl ? `${baseUrl}?page=${page}&limit=${limit}` : null;
  
  return useQuery({
    queryKey: [baseUrl, page, limit],
    queryFn: () => fetchData(url),
    enabled: enabled && !!baseUrl,
    placeholderData: (previousData) => previousData, 
  });
}
