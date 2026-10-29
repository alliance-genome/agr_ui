import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import fetchData from '../../lib/fetchData';
import { fetchOlsTerm, fetchOlsParents } from '../../lib/ols';
import { CollapsibleList } from '../../components/collapsibleList';
import ExternalLink from '../../components/ExternalLink.jsx';
import CountBadge from './CountBadge.jsx';
import { data as portalData } from '../diseasePortal/portalData.js';
import style from './style.module.scss';

const portalSlugForCurie = (curie) => {
  return Object.entries(portalData).find(([, v]) => v.doid === curie)?.[0];
};

// Normalizes both sources to one shape so the panel body below is written once.
// The Alliance disease endpoint answers with { doTerm, parents, crossReferenceLinkUrls };
// OLS needs two calls, because a term doc does not carry its own parents.
const fetchTermDetail = async (ontology, curie) => {
  if (ontology.source === 'ols') {
    const [term, parents] = await Promise.all([
      fetchOlsTerm(ontology.olsId, curie),
      fetchOlsParents(ontology.olsId, curie, ontology.curiePrefix),
    ]);
    return {
      term: term || { curie, name: curie },
      parents,
      xrefs: [],
    };
  }
  const data = await fetchData(`/api/disease/${encodeURIComponent(curie)}`);
  return {
    term: data?.doTerm || {},
    parents: data?.parents || [],
    xrefs: data?.crossReferenceLinkUrls || [],
  };
};

const TermDetailPanel = ({ curie, ontology }) => {
  const { data, isLoading } = useQuery({
    queryKey: ['ontology-term', ontology.id, curie],
    queryFn: () => fetchTermDetail(ontology, curie),
    enabled: !!curie,
    staleTime: 5 * 60_000,
  });

  if (!curie) return <em>Select a term to see details.</em>;
  if (isLoading || !data) return <em>Loading…</em>;

  const { term, parents, xrefs } = data;
  const synonyms = term.synonyms || [];
  const annotationTypes = ontology.annotationTypes || [];
  // Only the disease ontology has an Alliance entity page today. Anatomy terms
  // link out to the member that curates them until /anatomy/:id exists.
  const entityHref = ontology.entityPath ? ontology.entityPath(curie) : null;
  const portalSlug = ontology.id === 'disease' ? portalSlugForCurie(curie) : undefined;

  return (
    <div>
      <h3 className={style.detailTitle}>{term.name}</h3>
      <div className={style.curie}>{curie}</div>
      {annotationTypes.length > 0 && (
        <div className={style.detailBadgeRow}>
          {annotationTypes.map((t) => (
            <CountBadge key={t.id} curie={curie} type={t} expanded />
          ))}
        </div>
      )}

      <div className={style.detailSection}>
        {entityHref && (
          <Link to={entityHref} className={`btn btn-primary ${style.viewPageButton}`}>
            View {ontology.entityLabel}
          </Link>
        )}
        {portalSlug && (
          <Link to={`/disease-portal/${portalSlug}`} className={`btn btn-outline-primary ${style.viewPageButton}`}>
            View disease portal
          </Link>
        )}
        {!entityHref && ontology.termUrl && (
          <ExternalLink href={ontology.termUrl(curie)} className={`btn btn-outline-primary ${style.viewPageButton}`}>
            View at {ontology.mod || 'source ontology'}
          </ExternalLink>
        )}
      </div>

      {/* Anatomy ontologies are species-specific and not interchangeable — WBbt,
          ZFA and EMAPA all have an "intestine", and they are three different
          assertions about three different animals. Name the animal. */}
      {ontology.species && (
        <div className={style.detailSection}>
          <div className={style.detailSectionLabel}>Species</div>
          <div>
            <i>{ontology.species}</i>
          </div>
        </div>
      )}

      {term.definition && (
        <div className={style.detailSection}>
          <div className={style.detailSectionLabel}>Definition</div>
          <div>{term.definition}</div>
        </div>
      )}

      {parents.length > 0 && (
        <div className={style.detailSection}>
          <div className={style.detailSectionLabel}>Parent Terms</div>
          <ul className={style.parentList}>
            {parents.map((p) => (
              <li key={p.curie}>
                {/* OLS's hierarchicalParents folds is_a and part_of together and
                    does not say which produced a given parent, so anatomy rows
                    stay unlabelled rather than claim a relation we don't know. */}
                {ontology.source === 'ols' ? null : <em className={style.relation}>is-a</em>}
                <Link to={`/ontology/${ontology.id}/${p.curie}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {synonyms.length > 0 && (
        <div className={style.detailSection}>
          <div className={style.detailSectionLabel}>Synonyms</div>
          <CollapsibleList collapsedSize={5}>
            {synonyms.map((s, i) => (
              <span key={i}>{typeof s === 'string' ? s : s?.name || JSON.stringify(s)}</span>
            ))}
          </CollapsibleList>
        </div>
      )}

      {xrefs.length > 0 && (
        <div className={style.detailSection}>
          <div className={style.detailSectionLabel}>Cross-references</div>
          <CollapsibleList collapsedSize={5}>
            {xrefs.map((x, i) => (
              <ExternalLink key={i} href={x.url}>
                {x.referencedCurie || x.url}
              </ExternalLink>
            ))}
          </CollapsibleList>
        </div>
      )}
    </div>
  );
};

TermDetailPanel.propTypes = {
  curie: PropTypes.string,
  ontology: PropTypes.object.isRequired,
};

export default TermDetailPanel;
