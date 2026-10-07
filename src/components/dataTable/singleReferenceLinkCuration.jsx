import React from 'react';

import { Link } from 'react-router-dom';

import style from './style.module.scss';

// Local link to an AGR reference page for a single annotation-level reference.
// Annotation evidence can also be an ExternalDatabaseReference (OMIM, Orphanet), which
// has no AGR reference page — those render as plain text rather than a broken link.
const SingleReferenceLinkCuration = ({ singleReference }) => {
  const citation = singleReference?.shortCitation;
  if (!citation) return null;

  const curie = singleReference.curie;
  if (!curie?.startsWith('AGRKB:')) {
    return (
      <span className={style.ellipses} title={citation}>
        {citation}
      </span>
    );
  }

  return (
    <Link to={`/reference/${curie}`} title={citation} className={style.ellipses}>
      {citation}
    </Link>
  );
};

export default SingleReferenceLinkCuration;
