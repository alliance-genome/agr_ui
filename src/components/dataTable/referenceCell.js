import React from 'react';

import ExternalLink from '../externalLink';
import {CollapsibleList} from '../collapsibleList';

const ReferenceCell = (refs) => {
  return refs &&
    <CollapsibleList>
      {
        refs.map((ref) => {
          return <ExternalLink href={ref.url} key={ref.id} title={ref.id}>{ref.id}</ExternalLink>;
        })
      }
    </CollapsibleList>;
};

export default ReferenceCell;
