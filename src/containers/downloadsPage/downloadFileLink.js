import React from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

const fileExtension = (filename) => {
  return filename.substring(filename.lastIndexOf('.') + 1).toUpperCase();
};

const DownloadFileLink = ({url, fileType}) => {
  fileType = fileType || fileExtension(url);
  return <a className={style.fileLink} href={url}>{fileType}</a>;
};

DownloadFileLink.propTypes = {
  fileType: PropTypes.string,
  url: PropTypes.string.isRequired
};

export default DownloadFileLink;
