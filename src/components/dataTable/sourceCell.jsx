import React from 'react';
import CommaSeparatedList from '../commaSeparatedList.jsx';
//import { compareAlphabeticalCaseInsensitive } from '../../lib/utils';
import DataSourceLink from '../dataSourceLink.jsx';

const SourceCell = (refs) => {
  return (
    refs && (
      <CommaSeparatedList>
        {refs.map((ref) => (
          <DataSourceLink key={ref.name} reference={ref} />
        ))}
      </CommaSeparatedList>
    )
  );
};

export default SourceCell;
