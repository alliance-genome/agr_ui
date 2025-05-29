import React from 'react';
import PropTypes from 'prop-types';

const DownloadButton = ({downloadUrl, text = "Download", disabled = false}) => {
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

export default DownloadButton;
