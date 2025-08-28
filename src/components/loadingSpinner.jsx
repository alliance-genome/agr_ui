import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const LoadingSpinner = ({ size }) => <FontAwesomeIcon icon={faSpinner} spin {...(size && { size })} />;

LoadingSpinner.propTypes = {
  size: PropTypes.string,
};

export default LoadingSpinner;
