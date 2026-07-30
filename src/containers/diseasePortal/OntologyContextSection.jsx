import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../../lib/fetchData';
import OntologyTree from '../ontologyBrowser/OntologyTree.jsx';
import { ANNOTATION_TYPES } from '../ontologyBrowser/annotationTypes.js';
import { CountsProvider } from '../ontologyBrowser/useDiseaseCounts.jsx';
import { TermsProvider } from '../ontologyBrowser/useDiseaseTerms.jsx';
import style from './style.module.scss';

// Embedded, scoped ontology view for a disease portal page (KANBAN-1391).
// Two interaction modes by region:
//  - Ancestor context (immediate parents) renders as links OUT to the full-page
//    ontology browser, so the user can jump up the hierarchy.
//  - The focus term and its descendants stay in-page: the reused OntologyTree
//    handles expand/collapse drill-down locally, no route change.
const OntologyContextSection = ({ curie, name }) => {
  // Immediate parents come from the single-term doc (same shape the standalone
  // TermDetailPanel uses). The DO is a DAG, so there can be more than one.
  const { data, isLoading } = useQuery({
    queryKey: ['disease-term', curie],
    queryFn: () => fetchData(`/api/disease/${encodeURIComponent(curie)}`),
    enabled: !!curie,
    staleTime: 5 * 60_000,
  });

  // Highlight the term the user last clicked in the tree; selection is local,
  // it does not navigate. Start on the focus term.
  const [selectedCurie, setSelectedCurie] = useState(curie);
  // Open the focus node on load so its children are immediately visible.
  const [forceExpanded] = useState(() => new Set([curie]));

  if (!curie) {
    return null;
  }

  const parents = data?.parents || [];

  return (
    <CountsProvider>
      <TermsProvider>
        <div className={style.ontologyHeader}>
          {parents.length > 0 && (
            <div className={style.ontologyParents}>
              <span className={style.ontologyParentsLabel}>Parent terms:</span>
              {parents.map((p) => (
                <span key={p.curie} className={style.ontologyParentItem}>
                  <em className={style.ontologyRelation}>is-a</em>
                  <Link to={`/ontology/disease/${p.curie}`}>{p.name}</Link>
                </span>
              ))}
            </div>
          )}

          <div className={style.ontologyLegend}>
            <span className={style.ontologyLegendLabel}>Annotation Available:</span>
            {ANNOTATION_TYPES.map((t) => (
              <span key={t.id} className={style.ontologyLegendItem} style={{ background: t.bg, color: t.fg }}>
                {t.label}
              </span>
            ))}
          </div>
        </div>

        <div className={style.ontologyTreePane}>
          <OntologyTree
            curie={curie}
            name={name || (isLoading ? curie : data?.doTerm?.name) || curie}
            forceExpanded={forceExpanded}
            focusedCurie={selectedCurie}
            onSelect={setSelectedCurie}
            scrollOnFocus={false}
            nodeHref={(c) => `/ontology/disease/${c}`}
          />
        </div>
      </TermsProvider>
    </CountsProvider>
  );
};

OntologyContextSection.propTypes = {
  curie: PropTypes.string,
  name: PropTypes.string,
};

export default OntologyContextSection;
