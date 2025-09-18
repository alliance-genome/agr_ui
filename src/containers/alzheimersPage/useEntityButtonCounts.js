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

  // function filterData(items) {
  //   const set = new Set();
  //   for (const each of items) {
  //     const subject = each.subject;
  //     const symbol = subject.geneSymbol?.displayText
  //       ? subject.geneSymbol?.displayText
  //       : subject.name
  //         ? subject.name
  //         : subject.alleleSymbol?.displayText;
  //     const type = each.generatedRelationString;
  //
  //     if (symbol && !set.has(symbol) && !isWrongType(type)) {
  //       set.add(symbol);
  //     }
  //   }
  //
  //   return set.size;
  //   function isWrongType(type) {
  //     return type === 'is_not_implicated_in' || type === 'does_not_model';
  //   }
  // }

  return counts;
}
