import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const DiseaseNameCell = ({id, name}) => (
  <Link to={'/disease/' + id}>{name}</Link>
);

DiseaseNameCell.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
};

export default DiseaseNameCell;
