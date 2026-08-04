import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import fetchData from '../../lib/fetchData';
import style from './style.module.scss';

const ENDPOINT = '/api/search_autocomplete';
const SEARCH_ENDPOINT = '/api/search';
const FULL_RESULTS_LIMIT = 200;

// Autocomplete matches on lowercased *name* tokens and on the exact curie text,
// so `DOID:10763` finds the term but `doid:10763`, `DOID:` alone, or a bare
// numeric id return nothing. Canonicalize the prefix case against the active
// ontology's expected prefix (e.g. `DOID`, `WBbt`, `FBbt`) so lowercased curie
// input still hits the exact-curie path, without mangling correctly-cased
// mixed-case prefixes.
const CURIE_PREFIX = /^([A-Za-z][A-Za-z0-9_]*):?$/;
// Local id restricted to typical curie tail characters so we do not treat
// pasted URLs (which contain `/`) or free-form text as a curie and generate
// a bogus "Jump to" row.
const FULL_CURIE = /^([A-Za-z][A-Za-z0-9_]*):([A-Za-z0-9_.-]+)$/;
const normalizeCurieQuery = (q, curiePrefix) => {
  if (!curiePrefix) return q;
  const matchesPrefix = (p) => p.toLowerCase() === curiePrefix.toLowerCase();
  const full = q.match(FULL_CURIE);
  if (full && matchesPrefix(full[1])) return `${curiePrefix}:${full[2]}`;
  const prefix = q.match(CURIE_PREFIX);
  if (prefix && matchesPrefix(prefix[1])) return `${curiePrefix}${q.endsWith(':') ? ':' : ''}`;
  return q;
};

// Re-rank hits so the closest name match floats to the top. ES scores can
// bury an unnumbered parent term ("Parkinson's disease") under its numbered
// subtypes ("Parkinson's disease 1", "…2", …); tier by match strength, then
// prefer shorter names within a tier so the parent wins the tie.
const rankByCloseness = (query, results) => {
  const q = (query || '').trim().toLowerCase();
  if (!q || !results?.length) return results || [];
  const tier = (r) => {
    const n = (r.name || r.nameKey || '').toLowerCase();
    if (n === q) return 0;
    if (n.startsWith(q)) return 1;
    if (new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(n)) return 2;
    if (n.includes(q)) return 3;
    return 4;
  };
  return [...results].sort((a, b) => {
    const ta = tier(a);
    const tb = tier(b);
    if (ta !== tb) return ta - tb;
    const la = (a.name || a.nameKey || '').length;
    const lb = (b.name || b.nameKey || '').length;
    return la - lb;
  });
};

const AUTOSUGGEST_THEME = {
  container: { position: 'relative' },
  suggestionsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 100,
    background: 'white',
    border: '1px solid #dee2e6',
    borderTop: 'none',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  suggestionsList: { listStyle: 'none', margin: 0, padding: 0 },
  suggestion: { cursor: 'pointer' },
  suggestionHighlighted: { backgroundColor: '#e9ecef' },
};

const FullResultsModal = ({ isOpen, query, category, onSelect, onClose }) => {
  const [results, setResults] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen || !query) return;
    setResults(null);
    setError(false);
    const url = `${SEARCH_ENDPOINT}?q=${encodeURIComponent(query)}&category=${category}&limit=${FULL_RESULTS_LIMIT}`;
    fetchData(url)
      .then((data) => {
        const filtered = (data?.results || []).filter((r) => !/^obsolete/i.test(r.name || r.nameKey || ''));
        setResults(rankByCloseness(query, filtered));
      })
      .catch(() => setError(true));
  }, [isOpen, query, category]);

  return (
    <Modal isOpen={isOpen} toggle={onClose} size="lg" scrollable>
      <ModalHeader toggle={onClose}>
        Search results for &ldquo;{query}&rdquo;
        {results && (
          <small style={{ marginLeft: 8, color: '#6c757d', fontWeight: 'normal' }}>
            {results.length} term{results.length === 1 ? '' : 's'}
          </small>
        )}
      </ModalHeader>
      <ModalBody>
        {error && <em>Could not load results.</em>}
        {!error && results === null && <em>Loading…</em>}
        {!error && results && results.length === 0 && <em>No matches.</em>}
        {!error && results && results.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {results.map((r) => {
              const curie = r.curie || r.primaryKey;
              const name = r.name || r.nameKey || curie;
              return (
                <li key={curie} style={{ borderBottom: '1px solid #f1f3f5' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (curie) onSelect(curie);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 6px',
                      border: 'none',
                      background: 'transparent',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f8f9fa')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <strong>{name}</strong>{' '}
                    <span style={{ color: '#868e96', fontSize: '0.8rem', fontFamily: 'monospace' }}>{curie}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </ModalBody>
    </Modal>
  );
};

FullResultsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  query: PropTypes.string,
  category: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const OntologySearchBox = ({ onSelect, category, placeholder, curiePrefix }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [modalQuery, setModalQuery] = useState(null);
  const abortRef = useRef(null);

  const openModalFor = (q) => {
    const trimmed = (q || '').trim();
    if (!trimmed) return;
    // Normalize before firing the modal search — /api/search is case-sensitive
    // on curies just like the autocomplete, so a lowercase curie click on
    // "View all results" would otherwise still return zero hits.
    setModalQuery(normalizeCurieQuery(trimmed, curiePrefix));
  };
  const closeModal = () => setModalQuery(null);
  const onModalSelect = (curie) => {
    setModalQuery(null);
    setValue('');
    setSuggestions([]);
    onSelect(curie);
  };

  const onSuggestionsFetchRequested = ({ value: q }) => {
    if (!q || q.length < 2) {
      setSuggestions([]);
      return;
    }
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const normalized = normalizeCurieQuery(q, curiePrefix);
    // When the user has typed a fully-formed curie, add an instant
    // "jump to this term" row up front. `__instant` marks it as our synthetic
    // row so we can render it distinctly and drop any duplicate from the
    // backend hit list.
    const fullCurieMatch = normalized.match(FULL_CURIE);
    const instantRow = fullCurieMatch ? [{ __instant: true, curie: normalized, name: `Jump to ${normalized}` }] : [];
    const url = `${ENDPOINT}?q=${encodeURIComponent(normalized)}&category=${category}`;
    fetchData(url, { signal: controller.signal })
      .then((data) => {
        if (controller.signal.aborted) return;
        const filtered = (data?.results || []).filter((r) => !/^obsolete/i.test(r.name || r.nameKey || ''));
        const ranked = rankByCloseness(normalized, filtered).filter((r) => (r.curie || r.primaryKey) !== normalized);
        setSuggestions([...instantRow, ...ranked]);
      })
      .catch(() => {
        // Superseded by a newer keystroke; leave the in-flight query alone so
        // its stale instant row does not flicker over the latest state.
        if (controller.signal.aborted) return;
        if (instantRow.length) setSuggestions(instantRow);
      });
  };

  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onSuggestionSelected = (_e, { suggestion }) => {
    const curie = suggestion.curie || suggestion.primaryKey;
    if (curie) onSelect(curie);
    setValue('');
    setSuggestions([]);
  };

  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        highlightFirstSuggestion
        getSuggestionValue={(s) => (s.__instant ? s.curie : s.name || s.nameKey || '')}
        renderSuggestion={(s) =>
          s.__instant ? (
            <div style={{ padding: '4px 8px', background: '#f1f8ff' }}>
              <span style={{ color: '#0366d6', fontWeight: 600 }}>Jump to</span>{' '}
              <span style={{ fontFamily: 'monospace' }}>{s.curie}</span>
            </div>
          ) : (
            <div style={{ padding: '4px 8px' }}>
              <strong>{s.name || s.nameKey}</strong>{' '}
              <span style={{ color: '#868e96', fontSize: '0.8rem', fontFamily: 'monospace' }}>{s.curie}</span>
            </div>
          )
        }
        renderSuggestionsContainer={({ containerProps, children, query }) => {
          const { key, ...containerRest } = containerProps;
          return (
            <div key={key} {...containerRest}>
              <div className={style.suggestionsScroll}>{children}</div>
              {children && query && (
                <button
                  type="button"
                  className={style.viewAllButton}
                  aria-label={`View all results for ${query}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    openModalFor(query);
                  }}
                >
                  View all results for &ldquo;{query}&rdquo; &rarr;
                </button>
              )}
            </div>
          );
        }}
        inputProps={{
          value,
          placeholder: placeholder || 'Search terms',
          onChange: (_e, { newValue }) => setValue(newValue),
          className: 'form-control',
        }}
        theme={AUTOSUGGEST_THEME}
      />
      <FullResultsModal
        isOpen={!!modalQuery}
        query={modalQuery || ''}
        category={category}
        onSelect={onModalSelect}
        onClose={closeModal}
      />
    </>
  );
};

OntologySearchBox.propTypes = {
  onSelect: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  // Canonical curie prefix for the active ontology (e.g. `DOID`, `WBbt`).
  // When provided, lowercased curie input is rewritten to this exact casing
  // before hitting the backend; input with any other prefix passes through
  // unchanged.
  curiePrefix: PropTypes.string,
};

export default OntologySearchBox;
