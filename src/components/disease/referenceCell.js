import React from 'react';

import ExternalLink from '../externalLink';

const ReferenceCell = (refs) => {
  return (
    <span>
      {
        refs && refs.length > 0 && refs.map((ref, idx) => {
          if (ref.pubMedId && ref.pubMedUrl) {
            return <ExternalLink href={ref.pubMedUrl} key={idx} title={ref.pubMedId}>{ref.pubMedId}</ExternalLink>;
          } else if (ref.pubModId && ref.pubModUrl) {
            return <ExternalLink href={ref.pubModUrl} key={idx} title={ref.pubModId}>{ref.pubModId}</ExternalLink>;
          }
        })
        .reduce((prev, curr) => [prev, ', ', curr])
      }
    </span>
  );
};

export default ReferenceCell;
