import React from 'react';
import ExternalLink from '../externalLink';

const GeneticEntityCell = (feature) => {
  if (!feature) {
    return null;
  }
  return (
    <ExternalLink href={feature.modCrossRefFullUrl}>
      <span dangerouslySetInnerHTML={{__html: feature.symbol}} />
    </ExternalLink>
  );
};

export default GeneticEntityCell;
