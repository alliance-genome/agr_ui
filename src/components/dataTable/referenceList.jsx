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
  return (
    refs && (
      <CollapsibleList>
        {refs.map((ref) => {
          // when a filter is active, de-emphasize references matching none of its terms
          const citation = (ref.shortCitation || '').toLowerCase();
          const dim = terms.length > 0 && !terms.some((term) => citation.includes(term));
          return (
            <Link
              to={`/reference/${ref.curie}`}
              title={ref.shortCitation}
              className={`${trunc ? style.ellipses : ''}${dim ? ' ' + style.referenceDim : ''}`}
              key={ref.curie}
            >
              {ref.shortCitation}
            </Link>
          );
        })}
      </CollapsibleList>
    )
  );
};

export default ReferenceList;
