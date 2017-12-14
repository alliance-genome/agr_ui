import React from 'react';
import PropTypes from 'prop-types';

const DownloadButton = ({buttonText, downloadUrl}) => {
  return(
    <a
      className={'btn btn-primary'}
      href={downloadUrl}
    >
      {buttonText}
    </a>
  );
};

DownloadButton.propTypes = {
  buttonText: PropTypes.string,
  downloadUrl: PropTypes.string,
};

export default DownloadButton;
