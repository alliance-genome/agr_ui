import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../../lib/fetchData';

const Ctx = createContext(null);
const DEBOUNCE_MS = 40;
const MAX_BATCH = 200;

export const CountsProvider = ({ children }) => {
  const [counts, setCounts] = useState({});
  const pendingRef = useRef(new Set());
  const inFlightRef = useRef(new Set());
  const timerRef = useRef(null);
  const countsRef = useRef(counts);

  useEffect(() => {
    countsRef.current = counts;
  }, [counts]);

  const flush = useCallback(async () => {
    const batch = Array.from(pendingRef.current).slice(0, MAX_BATCH);
    if (batch.length === 0) return;
    batch.forEach((id) => {
      pendingRef.current.delete(id);
      inFlightRef.current.add(id);
    });
    try {
      const data = await fetchData(`/api/disease/counts?ids=${encodeURIComponent(batch.join(','))}`);
      setCounts((prev) => ({ ...prev, ...(data || {}) }));
    } catch {
      // leave the curies un-resolved; CountBadge renders nothing for them
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
      if (countsRef.current[curie]) return;
      if (inFlightRef.current.has(curie) || pendingRef.current.has(curie)) return;
      pendingRef.current.add(curie);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(flush, DEBOUNCE_MS);
    },
    [flush]
  );

  return <Ctx.Provider value={{ counts, request }}>{children}</Ctx.Provider>;
};

CountsProvider.propTypes = { children: PropTypes.node };

export const useDiseaseCounts = (curie) => {
  const ctx = useContext(Ctx);
  useEffect(() => {
    if (ctx && curie) ctx.request(curie);
  }, [ctx, curie]);
  return ctx?.counts?.[curie] || null;
};
