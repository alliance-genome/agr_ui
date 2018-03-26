import React from 'react';
import PropTypes from 'prop-types';

const DownloadButton = ({buttonText, downloadUrl, onClick}) => {
  return(
    <a
      className={'btn btn-primary'}
      href={downloadUrl}
      onClick={onClick}
      style={{color: 'white'}}
    >
      {buttonText}
    </a>
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
