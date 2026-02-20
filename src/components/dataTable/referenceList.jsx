import React from 'react';

import { Link } from 'react-router-dom';
import { CollapsibleList } from '../collapsibleList';

import style from './style.module.scss';

const ReferenceList = ({ refs, trunc = true }) => {
  return (
    refs && (
      <CollapsibleList>
        {refs.map((ref) => {
          return (
            <Link
              to={`/reference/${ref.curie}`}
              title={ref.shortCitation}
              className={trunc ? style.ellipses : ''}
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
