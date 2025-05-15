import React from 'react';
import PropTypes from 'prop-types';

const DownloadButton = ({downloadUrl, text, disabled = false}) => {
  return(
    <button
      className={'btn btn-outline-secondary'}
      onClick={() => window.location.replace(downloadUrl)}
      disabled = {disabled}
    >
      {text}
    </button>
  );
};

DownloadButton.propTypes = {
  downloadUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
};

DownloadButton.defaultProps = {
  text: 'Download',
};

export default DownloadButton;
