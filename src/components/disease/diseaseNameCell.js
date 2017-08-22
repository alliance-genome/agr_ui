import React from 'react';
import { Link } from 'react-router';

const DiseaseNameCell = (name, row) => (
  <Link to={'/disease/' + row.doId}>{name}</Link>
);

export default DiseaseNameCell;
