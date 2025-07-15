import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import style from './style.module.scss';

const LoadingOverlay = ({ loading }) => {
  return (
    <div className={`${style.loadingOverlay} ${loading ? style.loading : ''}`}>
      {loading && <FontAwesomeIcon icon={faSpinner} spin />}
    </div>
  );
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingOverlay;
