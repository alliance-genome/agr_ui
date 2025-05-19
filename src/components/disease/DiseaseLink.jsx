import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import DiseaseName from './DiseaseName.jsx';

const DiseaseLink = ({disease}) => (
  <Link to={'/disease/' + disease.id}>
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
