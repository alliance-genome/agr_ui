import React from 'react';

import ExternalLink from '../ExternalLink';

const ReferenceCellViaOrthologyCuration = () => {
  const curie = "MGI:6194238";
  const url = `http://www.informatics.jax.org/accession/${curie}`;
  return (
    <ExternalLink href={url} key={curie} title={curie}>{curie}</ExternalLink>
  );
};

export default ReferenceCellViaOrthologyCuration;
