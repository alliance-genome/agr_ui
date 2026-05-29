import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import fetchData from '../../lib/fetchData';

const ENDPOINT = '/api/search_autocomplete';
const SEARCH_ENDPOINT = '/api/search';
const FULL_RESULTS_LIMIT = 200;

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
      .then((data) => setResults(data?.results || []))
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

const OntologySearchBox = ({ onSelect, category, placeholder }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [modalQuery, setModalQuery] = useState(null);
  const abortRef = useRef(null);

  const openModalFor = (q) => {
    if (q && q.trim()) setModalQuery(q);
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
    const url = `${ENDPOINT}?q=${encodeURIComponent(q)}&category=${category}`;
    fetchData(url, { signal: controller.signal })
      .then((data) => {
        setSuggestions(data?.results || []);
      })
      .catch(() => {
        // aborted or failed; leave existing suggestions
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
        getSuggestionValue={(s) => s.name || s.nameKey || ''}
        renderSuggestion={(s) => (
          <div style={{ padding: '4px 8px' }}>
            <strong>{s.name || s.nameKey}</strong>{' '}
            <span style={{ color: '#868e96', fontSize: '0.8rem', fontFamily: 'monospace' }}>{s.curie}</span>
          </div>
        )}
        renderSuggestionsContainer={({ containerProps, children, query }) => {
          const { key, ...containerRest } = containerProps;
          return (
            <div key={key} {...containerRest}>
              <div style={{ maxHeight: 280, overflowY: 'auto' }}>{children}</div>
              {children && query && (
                <button
                  type="button"
                  aria-label={`View all results for ${query}`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    openModalFor(query);
                  }}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '9px 12px',
                    borderTop: '1px solid #dee2e6',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    background: '#f8f9fa',
                    color: '#0d6efd',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
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
};

export default OntologySearchBox;
