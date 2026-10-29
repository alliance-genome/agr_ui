import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import fetchData from '../../lib/fetchData';
import { fetchOlsChildren } from '../../lib/ols';
import { getOntology, DEFAULT_ONTOLOGY_ID } from './ontologies.js';

// Resolves the term docs every tree node needs: the node's own descendant count
// (does it get a chevron?) and its children (what opens underneath it).
//
// Each node calls useOntologyTerm(curie) on mount, and the provider coalesces
// those calls so the page makes a handful of round-trips rather than one per
// visible row. How it coalesces depends on the ontology's source:
//
//   'agr' — /api/disease/batch takes many curies at once, so one request covers
//           a whole wave of nodes.
//   'ols'  — OLS4 has no batch endpoint, so each node costs a request. In
//           exchange, a children response carries a full doc per child
//           including has_children, which lets us seed every child's chevron
//           state without the child ever issuing a request of its own.

const Ctx = createContext(null);
const DEBOUNCE_MS = 40;
// Keep the batch URL short enough that the stage WAF doesn't 403 us — each
// curie takes ~17 encoded chars, and requests over ~1800 chars start failing.
const MAX_BATCH = 80;
// OLS resolves one node per request, so cap how many are in the air at once;
// expanding a wide node should not open sixty sockets at the EBI.
const MAX_CONCURRENT_OLS = 6;

const mergeEntry = (previous, next) => ({
  ...previous,
  ...next,
  doTerm: { ...previous?.doTerm, ...next?.doTerm },
  // A seeded entry carries no children; never let it erase a resolved list.
  children: next?.children !== undefined ? next.children : previous?.children,
});

const mergeTerms = (previous, next) =>
  Object.entries(next || {}).reduce((acc, [curie, entry]) => ({ ...acc, [curie]: mergeEntry(acc[curie], entry) }), {
    ...previous,
  });

const resolveViaAlliance = (batch) => fetchData(`/api/disease/batch?ids=${encodeURIComponent(batch.join(','))}`);

const resolveViaOls = async (ontology, batch) => {
  const parts = await Promise.all(
    batch.map(async (curie) => {
      const children = await fetchOlsChildren(ontology.olsId, curie, ontology.curiePrefix);
      const part = { [curie]: { doTerm: { curie, descendantCount: children.length }, children } };
      // Seed each child so its row knows whether to draw a chevron the moment
      // it mounts — no request, and no chevron flashing in then out.
      children.forEach((child) => {
        part[child.curie] = mergeEntry(part[child.curie], { doTerm: child });
      });
      return part;
    })
  );
  return parts.reduce((acc, part) => mergeTerms(acc, part), {});
};

export const TermsProvider = ({ ontology, children }) => {
  const activeOntology = ontology || getOntology(DEFAULT_ONTOLOGY_ID);
  const [terms, setTerms] = useState({});
  const pendingRef = useRef(new Set());
  const inFlightRef = useRef(new Set());
  const timerRef = useRef(null);
  const termsRef = useRef(terms);
  // Bumped whenever the ontology changes, so responses still in flight for the
  // ontology the user just left are dropped instead of landing in the new one.
  const generationRef = useRef(0);

  useEffect(() => {
    termsRef.current = terms;
  }, [terms]);

  useEffect(() => {
    generationRef.current += 1;
    pendingRef.current.clear();
    inFlightRef.current.clear();
    clearTimeout(timerRef.current);
    setTerms({});
  }, [activeOntology.id]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
    };
  }, []);

  const flush = useCallback(async () => {
    const generation = generationRef.current;
    const isOls = activeOntology.source === 'ols';
    const batch = Array.from(pendingRef.current).slice(0, isOls ? MAX_CONCURRENT_OLS : MAX_BATCH);
    if (batch.length === 0) return;
    batch.forEach((id) => {
      pendingRef.current.delete(id);
      inFlightRef.current.add(id);
    });
    try {
      const data = isOls ? await resolveViaOls(activeOntology, batch) : await resolveViaAlliance(batch);
      if (generationRef.current === generation) {
        setTerms((prev) => mergeTerms(prev, data));
      }
    } catch {
      // unresolved terms stay undefined; TreeNode will show arrow optimistically
    } finally {
      batch.forEach((id) => inFlightRef.current.delete(id));
    }
    if (pendingRef.current.size > 0) {
      timerRef.current = setTimeout(flush, DEBOUNCE_MS);
    }
  }, [activeOntology]);

  const request = useCallback(
    (curie) => {
      if (!curie) return;
      const known = termsRef.current[curie];
      if (known?.children !== undefined) return;
      // A seeded leaf is already fully answered — OLS told us it has no
      // children, so there is nothing left to fetch.
      if (known?.doTerm && known.doTerm.descendantCount === 0) return;
      if (inFlightRef.current.has(curie) || pendingRef.current.has(curie)) return;
      pendingRef.current.add(curie);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(flush, DEBOUNCE_MS);
    },
    [flush]
  );

  return <Ctx.Provider value={{ terms, request }}>{children}</Ctx.Provider>;
};

TermsProvider.propTypes = {
  ontology: PropTypes.object,
  children: PropTypes.node,
};

export const useOntologyTerm = (curie) => {
  const ctx = useContext(Ctx);
  useEffect(() => {
    if (ctx && curie) ctx.request(curie);
  }, [ctx, curie]);
  return ctx?.terms?.[curie] || null;
};
