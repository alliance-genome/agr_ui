import React from 'react';

import { Link } from 'react-router-dom';
import { CollapsibleList } from '../collapsibleList';

import style from './style.module.scss';

const ReferenceList = ({ refs, trunc = true, filterTerm }) => {
  // filterVal is a string for text filters, an array for checkbox filters; accept either
  const terms = (Array.isArray(filterTerm) ? filterTerm : [filterTerm])
    .map((value) =>
      String(value ?? '')
        .trim()
        .toLowerCase()
    )
    .filter(Boolean);
  // Orphanet/OMIM evidence carries no citation, so there is nothing to show (KANBAN-1505).
  const citedRefs = (refs || []).filter((ref) => ref?.shortCitation);
  if (!citedRefs.length) {
    return null;
  }

  return (
    <CollapsibleList>
      {citedRefs.map((ref) => {
        // when a filter is active, de-emphasize references matching none of its terms
        const citation = ref.shortCitation.toLowerCase();
        const dim = terms.length > 0 && !terms.some((term) => citation.includes(term));
        const className = `${trunc ? style.ellipses : ''}${dim ? ' ' + style.referenceDim : ''}`;
        // only AGRKB references have an Alliance reference page to link to
        return ref.curie?.startsWith('AGRKB:') ? (
          <Link to={`/reference/${ref.curie}`} title={ref.shortCitation} className={className} key={ref.curie}>
            {ref.shortCitation}
          </Link>
        ) : (
          <span title={ref.shortCitation} className={className} key={ref.curie}>
            {ref.shortCitation}
          </span>
        );
      })}
    </CollapsibleList>
  );
};

export default ReferenceList;
