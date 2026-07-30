import React from 'react';
import PropTypes from 'prop-types';

import style from './style.module.scss';

const fileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.') + 1);
};

const formatFileSize = (bytes) => {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const decimals = value >= 100 ? 0 : value >= 10 ? 1 : 2;
  return `${value.toFixed(decimals)} ${units[unitIndex]}`;
};

const DownloadFileLink = ({ url, fileType, size }) => {
  if (!url) {
    return null;
  }
  fileType = (fileType || fileExtension(fileType) || '').toUpperCase();
  return (
    <a className={style.fileLink} href={url}>
      {fileType} {size ? `(${formatFileSize(size)})` : ''}
    </a>
  );
};

DownloadFileLink.propTypes = {
  fileType: PropTypes.string,
  url: PropTypes.string,
  size: PropTypes.number,
};

export default DownloadFileLink;
