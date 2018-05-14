import React from 'react';
import PropTypes from 'prop-types';

const DownloadButton = ({buttonText, downloadUrl, onClick}) => {
  return(
    <button
      className={'btn btn-outline-secondary'}
      onClick={(downloadUrl && (() => window.location.replace(downloadUrl))) || onClick}
    >
      {buttonText}
    </button>
  );
};

DownloadButton.propTypes = {
  buttonText: PropTypes.string,
  downloadUrl: PropTypes.string,
  onClick: PropTypes.func,
};

DownloadButton.defaultProps = {
  buttonText: 'Download',
};

export default DownloadButton;
