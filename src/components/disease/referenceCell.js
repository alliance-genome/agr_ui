import React from 'react';

const ReferenceCell = (refs) => {
  return refs && refs.map((ref) => {
    if (ref.pubMedId && ref.pubMedUrl) {
      return <a href={ref.pubMedUrl}>{ref.pubMedId}</a>;
    } else if (ref.publicationModId && ref.pubModUrl) {
      return <a href={ref.pubModUrl}>{ref.publicationModId}</a>;
    }
  })
  .reduce((prev, curr) => [prev, ', ', curr]);
};

export default ReferenceCell;
