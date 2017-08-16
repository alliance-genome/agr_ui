import React from 'react';

const ReferenceCell = (refs) => {
  return (
    <span>
      {
        refs && refs.map((ref) => {
          if (ref.pubMedId && ref.pubMedUrl) {
            return <a href={ref.pubMedUrl}>{ref.pubMedId}</a>;
          } else if (ref.publicationModId && ref.pubModUrl) {
            return <a href={ref.pubModUrl}>{ref.publicationModId}</a>;
          }
        })
        .reduce((prev, curr) => [prev, ', ', curr])
      }
    </span>
  );
};

export default ReferenceCell;
