import React from 'react';
import { Link } from 'react-router-dom';

const DiseaseNameCell = ({id, name}) => (
  <Link to={'/disease/' + id}>{name}</Link>
);

export default DiseaseNameCell;
