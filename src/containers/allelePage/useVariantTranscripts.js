import { useState, useCallback } from 'react';
import { buildTableQueryString } from '../../lib/utils';

function useFetchData(url) {
  const [data, setData] = useState({
    data: [],
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback( async (opts) => {
    try {
      const response = await fetch(`${url}?${buildTableQueryString(opts)}`);
      const body = await response.json();
      if (response.ok) {
        const {results, ...others} = body;
        setLoading(false);
        setData({
          ...others,
          data: results,
        });
      } else {
        throw new Error(body);
      }
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }, [url, setData, setLoading, setError]);

  return {
    ...data,
    loading,
    error,
    fetchData,
  };
}

export default function useVariantTranscripts(variantId) {
  return useFetchData(`/api/variant/${variantId}/transcripts`);
}
