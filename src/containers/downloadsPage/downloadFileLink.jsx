import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const fileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.') + 1);
};

const DownloadFileLink = ({ url, fileType, size }) => {
  if (!url) {
    return null;
  }
  fileType = (fileType || fileExtension(fileType) || '').toUpperCase();
  return (
    <a className={style.fileLink} href={url}>
      {fileType} {size ? `(${(size / 1024 / 1024).toFixed(2)} MB)` : ''}
    </a>
  );
};

DownloadFileLink.propTypes = {
  fileType: PropTypes.string,
  url: PropTypes.string,
  size: PropTypes.number,
};

export default DownloadFileLink;
