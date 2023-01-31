import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DiseaseName from '../disease/DiseaseName';

const DiseaseLink = ({disease}) => (
  <Link to={'/disease/' + disease.curie}>
    <DiseaseName disease={disease} />
  </Link>
);

DiseaseLink.propTypes = {
  disease: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default DiseaseLink;
