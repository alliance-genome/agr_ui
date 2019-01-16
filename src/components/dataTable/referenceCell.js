import React from 'react';

import ExternalLink from '../externalLink';
import CommaSeparatedList from '../commaSeparatedList';

const ReferenceCell = (refs) => {
  return refs &&
    <CommaSeparatedList>
      {
        refs.map((ref) => {
          return <ExternalLink href={ref.url} key={ref.id} title={ref.id}>{ref.id}</ExternalLink>;
        })
      }
    </CommaSeparatedList>;
};

export default ReferenceCell;
