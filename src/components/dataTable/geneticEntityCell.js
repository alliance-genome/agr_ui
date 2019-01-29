import React from 'react';
import DataSourceLink from '../dataSourceLink';

const GeneticEntityCell = (entity) => {
  if (!entity) {
    return null;
  }
  return (
    <DataSourceLink reference={entity.crossReferences && entity.crossReferences.primary}>
      <span dangerouslySetInnerHTML={{__html: entity.symbol}} />
    </DataSourceLink>
  );
};

export default GeneticEntityCell;
