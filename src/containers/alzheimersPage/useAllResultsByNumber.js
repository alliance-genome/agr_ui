import { useEffect, useState } from 'react';

export function useAllResultsByNumber(url, number) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!number) return;

    let cancelled = false;
    setLoading(true);  // Start loading

    const fetchAll = async () => {
      try {
        const res = await fetch(`${url}?limit=${number}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) {
          setData(filterData(json.results));
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);  // End loading
        }
      }
    };

    fetchAll();

    return () => {
      cancelled = true;
    };
  }, [url, number]);

  function filterData(data) {
    const filtered = [];
    const set = new Set();

    data.forEach((each) => {
      const symbol = each.subject.geneSymbol.displayText;
      const type = each.generatedRelationString;
      if (!set.has(symbol) && type !== "is_not_implicated_in") {
        set.add(symbol);
        filtered.push(each);
      }
    });
    return filtered;
  }

  return { data, error, loading };
}
