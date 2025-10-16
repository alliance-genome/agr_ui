import { useEffect, useState } from 'react';

export function useEntityButtonCounts(url) {
  const [counts, setCounts] = useState();

  useEffect(() => {
    let cancelled = false;

    async function fetchCount() {
      try {
        const response = await fetch(`${url}`);
        if (!response.ok) throw new Error(response.status);
        const json = await response.json();
        if (!cancelled) {
          setCounts(json);
        }
      } catch {
        if (!cancelled) {
          setCounts(undefined);
        }
      }
    }

    fetchCount();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return counts;
}
