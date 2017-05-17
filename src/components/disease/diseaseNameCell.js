import React from 'react';

const DiseaseNameCell = (name, row) => (
  row.doIdDisplay && <a href={row.doIdDisplay.url}>{name}</a>
);

export default DiseaseNameCell;
