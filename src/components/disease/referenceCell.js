import React from 'react';

const ReferenceCell = (refs) => {
  return refs.map((ref) => {
    if (ref.pubMedId && ref.pubMedUrl) {
      return <a href={ref.pubMedUrl}>{ref.pubMedId}</a>;
    } else {
      return <span>{ref.publicationModId}</span>;
    }
  })
  .reduce((prev, curr) => [prev, ', ', curr]);
};

export default ReferenceCell;
