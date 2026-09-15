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
// Everything in the tree stays in-page (KANBAN-1497): clicking a term row only
// highlights it, the chevron expands and collapses, and the route out to the
// full browser is the single "Browse Ontology for ..." link on the section
// heading. The G/A/M count badges still link to their disease pages.
// Omitting nodeHref is what keeps term labels plain spans; the standalone
// browser omits it too, so this stays embed-local.
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
