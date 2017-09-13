import React from 'react';

const ReferenceCell = (refs) => {
  return (
    <span>
      {
        refs && refs.map((ref) => {
          if (ref.pubMedId && ref.pubMedUrl) {
            return <a href={ref.pubMedUrl}>{ref.pubMedId}</a>;
          } else if (ref.pubModId && ref.pubModUrl) {
            return <a href={ref.pubModUrl}>{ref.pubModId}</a>;
          }
        })
        .reduce((prev, curr) => [prev, ', ', curr])
      }
    </span>
  );
};

export default ReferenceCell;
