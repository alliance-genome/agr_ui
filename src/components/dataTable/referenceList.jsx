import React from 'react';

import { Link } from 'react-router-dom';
import { CollapsibleList } from '../collapsibleList';

import style from './style.module.scss';

const ReferenceList = ({ refs, trunc = true, filterTerm }) => {
  const term = (filterTerm || '').trim().toLowerCase();
  return (
    refs && (
      <CollapsibleList>
        {refs.map((ref) => {
          // when a filter is active, de-emphasize references that don't match it
          const dim = term.length > 0 && !(ref.shortCitation || '').toLowerCase().includes(term);
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
