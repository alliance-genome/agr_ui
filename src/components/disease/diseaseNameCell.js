import React from 'react';
import { Link } from 'react-router-dom';

const DiseaseNameCell = (name, row) => (
  <Link to={'/disease/' + row.doId}>{name}</Link>
);

export default DiseaseNameCell;
