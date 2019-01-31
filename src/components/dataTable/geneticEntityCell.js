import React from 'react';
import ExternalLink from '../externalLink';

const GeneticEntityCell = (entity) => {
  if (!entity) {
    return null;
  }
  return (
    <ExternalLink href={entity.url}>
      <span dangerouslySetInnerHTML={{__html: entity.symbol}} />
    </ExternalLink>
  );
};

export default GeneticEntityCell;
