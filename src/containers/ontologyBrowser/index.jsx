import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDna } from '@fortawesome/free-solid-svg-icons';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import fetchData from '../../lib/fetchData';
import OntologyTree from './OntologyTree.jsx';
import TermDetailPanel from './TermDetailPanel.jsx';
import OntologySearchBox from './OntologySearchBox.jsx';
import { ONTOLOGY_GROUPS, getOntology } from './ontologies.js';
import { CountsProvider } from './useDiseaseCounts.jsx';
import { TermsProvider } from './useOntologyTerms.jsx';
import { fetchOlsAncestors } from '../../lib/ols';
import style from './style.module.scss';

const PAGE_TITLE = 'Ontology Browser';

const OntologyBrowser = () => {
  const { ontology: ontologyParam, id } = useParams();
  const navigate = useNavigate();
  const ontology = getOntology(ontologyParam);
  const focusedCurie = id || null;
  // Ref latches synchronously to the curie the user just clicked in the tree.
  // Using a ref (not state) avoids any render-timing race between the state
  // update and the router URL change — by the time focusedCurie flips to the
  // new curie, the ref already reflects the same value, so fromTree is
  // guaranteed correct on the very first render after the click.
  const treeClickRef = useRef(null);
  const fromTree = !!focusedCurie && treeClickRef.current === focusedCurie;

  const { data: ancestors } = useQuery({
    queryKey: ['ontology-ancestors', ontology.id, focusedCurie],
    queryFn: () =>
      ontology.source === 'ols'
        ? fetchOlsAncestors(ontology.olsId, focusedCurie, ontology.curiePrefix)
        : fetchData(`/api/disease/${encodeURIComponent(focusedCurie)}/ancestors`),
    enabled: !!focusedCurie && !fromTree,
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

  const handleSelect = (curie, opts = {}) => {
    if (opts.fromTree) treeClickRef.current = curie;
    navigate(`/ontology/${ontology.id}/${curie}`);
  };
  const handleTreeSelect = (curie) => handleSelect(curie, { fromTree: true });

  const annotationTypes = ontology.annotationTypes || [];

  const detailCurie = useMemo(() => focusedCurie || ontology.rootCurie || null, [focusedCurie, ontology.rootCurie]);

  // Batched fetches cascade down the ancestor chain, so the tree layout shifts
  // multiple times before it settles. Keep the tree pane visually blank until
  // the focused row has actually mounted, then reveal in one go.
  const shouldHideTree = !!focusedCurie && !fromTree;
  const [treeRevealed, setTreeRevealed] = useState(!shouldHideTree);
  useEffect(() => {
    setTreeRevealed(!shouldHideTree);
  }, [shouldHideTree, focusedCurie]);
  // Safety net: if the focused row never mounts (bad curie, empty ancestor
  // chain, upstream failure) reveal after a short timeout so the user isn't
  // stuck watching a spinner forever.
  useEffect(() => {
    if (!shouldHideTree) return undefined;
    const t = setTimeout(() => setTreeRevealed(true), 3000);
    return () => clearTimeout(t);
  }, [shouldHideTree, focusedCurie]);
  const handleFocusMounted = useCallback(() => {
    requestAnimationFrame(() => setTreeRevealed(true));
  }, []);

  return (
    <CountsProvider>
      <TermsProvider ontology={ontology}>
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
              {ONTOLOGY_GROUPS.map((group) => (
                <optgroup key={group.label} label={group.label}>
                  {group.ontologies.map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className={style.searchRow}>
            <OntologySearchBox
              onSelect={handleSelect}
              ontology={ontology}
              placeholder={`Search ${ontology.label} terms or IDs`}
            />
          </div>

          {annotationTypes.length > 0 && (
            <div className={style.legend}>
              <span className={style.legendLabel}>Annotation Available:</span>
              {annotationTypes.map((t) => (
                <span key={t.id} className={style.legendItem} style={{ background: t.bg, color: t.fg }}>
                  {t.label}
                </span>
              ))}
            </div>
          )}

          <div className={style.layout}>
            <div className={style.treePane}>
              {!treeRevealed && (
                <div className={style.treeLoading}>
                  <FontAwesomeIcon icon={faDna} spin size="2x" className={style.treeLoadingIcon} />
                  <span className={style.treeLoadingText}>Loading…</span>
                </div>
              )}
              <div style={{ visibility: treeRevealed ? 'visible' : 'hidden' }}>
                <OntologyTree
                  key={ontology.id}
                  annotationTypes={annotationTypes}
                  curie={ontology.rootCurie}
                  name={ontology.rootName}
                  forceExpanded={forceExpanded}
                  focusedCurie={focusedCurie}
                  onSelect={handleTreeSelect}
                  scrollOnFocus={!fromTree}
                  onFocusMounted={handleFocusMounted}
                />
              </div>
            </div>
            <div className={style.detailPane}>
              <TermDetailPanel curie={detailCurie} ontology={ontology} />
            </div>
          </div>
        </div>
      </TermsProvider>
    </CountsProvider>
  );
};

export default OntologyBrowser;
