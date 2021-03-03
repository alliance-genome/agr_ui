import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const fileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.') + 1);
};

const DownloadFileLink = ({url, fileType}) => {
  if (!url) {
    return null;
  }
  fileType = (fileType || fileExtension(url) || '').toUpperCase();
  return <a className={style.fileLink} href={url}>{fileType}</a>;
};

DownloadFileLink.propTypes = {
  fileType: PropTypes.string,
  url: PropTypes.string,
};

export default DownloadFileLink;
