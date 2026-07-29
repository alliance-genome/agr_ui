import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import fetchData from '../../lib/fetchData';
import OntologyTree from './OntologyTree.jsx';
import TermDetailPanel from './TermDetailPanel.jsx';
import OntologySearchBox from './OntologySearchBox.jsx';
import { ONTOLOGIES, getOntology } from './ontologies.js';
import { ANNOTATION_TYPES } from './annotationTypes.js';
import { CountsProvider } from './useDiseaseCounts.jsx';
import { TermsProvider } from './useDiseaseTerms.jsx';
import style from './style.module.scss';

const PAGE_TITLE = 'Ontology Browser';

const OntologyBrowser = () => {
  const { ontology: ontologyParam, id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const ontology = getOntology(ontologyParam);
  const focusedCurie = id || null;
  // When the user clicks a term inside the tree we set fromTree=true so we
  // skip re-anchoring the tree to the canonical ancestor chain (which can
  // belong to a different parent for DAG terms) and skip scrolling.
  const fromTree = !!location.state?.fromTree;

  const { data: ancestors } = useQuery({
    queryKey: ['ontology-ancestors', ontology.id, focusedCurie],
    queryFn: () => fetchData(`/api/disease/${encodeURIComponent(focusedCurie)}/ancestors`),
    enabled: !!focusedCurie && ontology.id === 'disease' && !fromTree,
    staleTime: 5 * 60_000,
  });

  const [forceExpanded, setForceExpanded] = useState(() =>
    ontology.rootCurie ? new Set([ontology.rootCurie]) : new Set()
  );

  useEffect(() => {
    if (fromTree) return; // keep current expansion state
    const next = new Set();
    if (ontology.rootCurie) next.add(ontology.rootCurie);
    if (ancestors && Array.isArray(ancestors)) {
      ancestors.forEach((a) => next.add(a.curie));
    } else if (focusedCurie) {
      next.add(focusedCurie);
    }
    setForceExpanded(next);
  }, [ancestors, focusedCurie, ontology.rootCurie, fromTree]);

  const handleSelect = (curie, opts = {}) =>
    navigate(`/ontology/${ontology.id}/${curie}`, opts.fromTree ? { state: { fromTree: true } } : undefined);
  const handleTreeSelect = (curie) => handleSelect(curie, { fromTree: true });

  const detailCurie = useMemo(() => focusedCurie || ontology.rootCurie || null, [focusedCurie, ontology.rootCurie]);

  return (
    <CountsProvider>
      <TermsProvider>
        <div className={style.page}>
          <HeadMetaTags title={PAGE_TITLE} />
          <h2>{PAGE_TITLE}</h2>

          <div className={style.chooserRow}>
            <label htmlFor="ontology-chooser" className={style.chooserLabel}>
              Ontology:
            </label>
            <select
              id="ontology-chooser"
              className={`form-control ${style.chooserSelect}`}
              value={ontology.id}
              onChange={(e) => navigate(`/ontology/${e.target.value}`)}
            >
              {ONTOLOGIES.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <p className={style.explainer}>
            Browsing <strong>{ontology.label}</strong> starting at <strong>{ontology.rootName}</strong> (
            {ontology.rootCurie}). Use the search box to jump to any term.
          </p>

          <div className={style.searchRow}>
            <OntologySearchBox
              onSelect={handleSelect}
              category={ontology.searchCategory}
              placeholder={`Search ${ontology.label} terms`}
            />
          </div>

          <div className={style.legend}>
            <span className={style.legendLabel}>Annotation Available:</span>
            {ANNOTATION_TYPES.map((t) => (
              <span key={t.id} className={style.legendItem} style={{ background: t.bg, color: t.fg }}>
                {t.label}
              </span>
            ))}
          </div>

          <div className={style.layout}>
            <div className={style.treePane}>
              <OntologyTree
                curie={ontology.rootCurie}
                name={ontology.rootName}
                forceExpanded={forceExpanded}
                focusedCurie={focusedCurie}
                onSelect={handleTreeSelect}
                scrollOnFocus={!fromTree}
              />
            </div>
            <div className={style.detailPane}>
              <TermDetailPanel curie={detailCurie} />
            </div>
          </div>
        </div>
      </TermsProvider>
    </CountsProvider>
  );
};

export default OntologyBrowser;
