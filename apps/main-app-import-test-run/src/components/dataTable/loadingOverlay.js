import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const LoadingOverlay = ({loading}) => {
  return (
    <div className={`${style.loadingOverlay} ${loading ? style.loading : ''}`}>
      {loading && <i className='fa fa-spinner fa-spin' />}
    </div>
  );
};

LoadingOverlay.propTypes = {
  loading: PropTypes.bool,
};

export default LoadingOverlay;
