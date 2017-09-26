import React from 'react';

import ExternalLink from '../externalLink';

const ReferenceCell = (refs) => {
  return (
    <span>
      {
        refs && refs.map((ref) => {
          if (ref.pubMedId && ref.pubMedUrl) {
            return <ExternalLink href={ref.pubMedUrl}>{ref.pubMedId}</ExternalLink>;
          } else if (ref.pubModId && ref.pubModUrl) {
            return <ExternalLink href={ref.pubModUrl}>{ref.pubModId}</ExternalLink>;
          }
        })
        .reduce((prev, curr) => [prev, ', ', curr])
      }
    </span>
  );
};

export default ReferenceCell;
