import React from 'react';
import PropTypes from 'prop-types';

const DiseaseName = ({ disease }) => {
  return <span className="hyphenate">{disease.name}</span>;
};

DiseaseName.propTypes = {
  disease: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default DiseaseName;
