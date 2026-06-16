import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import fetchData from '../../lib/fetchData';
import { CollapsibleList } from '../../components/collapsibleList';
import ExternalLink from '../../components/ExternalLink.jsx';
import CountBadge from './CountBadge.jsx';
import { ANNOTATION_TYPES } from './annotationTypes.js';
import { data as portalData } from '../diseasePortal/portalData.js';
import style from './style.module.scss';

const portalSlugForCurie = (curie) => {
  return Object.entries(portalData).find(([, v]) => v.doid === curie)?.[0];
};

const TermDetailPanel = ({ curie }) => {
  const { ontology = 'disease' } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['disease-term', curie],
    queryFn: () => fetchData(`/api/disease/${encodeURIComponent(curie)}`),
    enabled: !!curie,
    staleTime: 5 * 60_000,
  });

  if (!curie) return <em>Select a term to see details.</em>;
  if (isLoading || !data) return <em>Loading…</em>;

  const term = data.doTerm || {};
  const synonyms = term.synonyms || [];
  const xrefs = data.crossReferenceLinkUrls || [];
  const parents = data.parents || [];
  const portalSlug = portalSlugForCurie(curie);

  return (
    <div>
      <h3 className={style.detailTitle}>{term.name}</h3>
      <div className={style.curie}>{curie}</div>
      <div className={style.detailBadgeRow}>
        {ANNOTATION_TYPES.map((t) => (
          <CountBadge key={t.id} curie={curie} type={t} expanded />
        ))}
      </div>

      <div className={style.detailSection}>
        <Link to={`/disease/${curie}`} className={`btn btn-primary ${style.viewPageButton}`}>
          View disease page <FontAwesomeIcon icon={faArrowRight} />
        </Link>
        {portalSlug && (
          <Link to={`/disease-portal/${portalSlug}`} className={`btn btn-outline-primary ${style.viewPageButton}`}>
            View disease portal
          </Link>
        )}
      </div>

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
                <em className={style.relation}>is-a</em>
                <Link to={`/ontology/${ontology}/${p.curie}`}>{p.name}</Link>
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
};

export default TermDetailPanel;
