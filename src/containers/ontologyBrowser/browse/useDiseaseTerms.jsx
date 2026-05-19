import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../../lib/fetchData';

// Batches disease term-doc fetches across all tree nodes so the page only
// makes a few round-trips even when many nodes are visible. Each TreeNode
// calls useDiseaseTerm(curie) on mount; the provider debounces and pulls
// many ids in one /api/disease/batch request.

const Ctx = createContext(null);
const DEBOUNCE_MS = 40;
const MAX_BATCH = 200;

export const TermsProvider = ({ children }) => {
  const [terms, setTerms] = useState({});
  const pendingRef = useRef(new Set());
  const inFlightRef = useRef(new Set());
  const timerRef = useRef(null);
  const termsRef = useRef(terms);

  useEffect(() => {
    termsRef.current = terms;
  }, [terms]);

  const flush = useCallback(async () => {
    const batch = Array.from(pendingRef.current).slice(0, MAX_BATCH);
    if (batch.length === 0) return;
    batch.forEach((id) => {
      pendingRef.current.delete(id);
      inFlightRef.current.add(id);
    });
    try {
      const data = await fetchData(
        `/api/disease/batch?ids=${encodeURIComponent(batch.join(','))}`
      );
      setTerms((prev) => ({ ...prev, ...(data || {}) }));
    } catch {
      // unresolved terms stay undefined; TreeNode will show arrow optimistically
    } finally {
      batch.forEach((id) => inFlightRef.current.delete(id));
    }
    if (pendingRef.current.size > 0) {
      timerRef.current = setTimeout(flush, DEBOUNCE_MS);
    }
  }, []);

  const request = useCallback(
    (curie) => {
      if (!curie) return;
      if (termsRef.current[curie]) return;
      if (inFlightRef.current.has(curie) || pendingRef.current.has(curie)) return;
      pendingRef.current.add(curie);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(flush, DEBOUNCE_MS);
    },
    [flush]
  );

  return <Ctx.Provider value={{ terms, request }}>{children}</Ctx.Provider>;
};

TermsProvider.propTypes = { children: PropTypes.node };

export const useDiseaseTerm = (curie) => {
  const ctx = useContext(Ctx);
  useEffect(() => {
    if (ctx && curie) ctx.request(curie);
  }, [ctx, curie]);
  return ctx?.terms?.[curie] || null;
};
