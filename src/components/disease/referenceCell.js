import React from 'react';

import ExternalLink from '../externalLink';
import CommaSeparatedList from '../commaSeparatedList';

const ReferenceCell = (refs) => {
  return refs &&
    <CommaSeparatedList>
      {
        refs.map((ref, idx) => {
          if (ref.pubMedId && ref.pubMedUrl) {
            return <ExternalLink href={ref.pubMedUrl} key={idx} title={ref.pubMedId}>{ref.pubMedId}</ExternalLink>;
          } else if (ref.pubModId && ref.pubModUrl) {
            return <ExternalLink href={ref.pubModUrl} key={idx} title={ref.pubModId}>{ref.pubModId}</ExternalLink>;
          }
        })
      }
    </CommaSeparatedList>;
};

export default ReferenceCell;
