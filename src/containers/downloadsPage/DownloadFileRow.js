import React from 'react';
import PropTypes from 'prop-types';
import DownloadFileLink from './downloadFileLink';

const DownloadFileRow = ({description, url, fileType}) => {
  if (!Array.isArray(url)) {
    url = [url];
  }

  url = url.filter(u => u);

  return (
    <tr>
      <td>{description}</td>
      <td>
        {url.map(u => <DownloadFileLink fileType={fileType} key={u} url={u} />)}
      </td>
    </tr>
  );
};

DownloadFileRow.propTypes = {
  description: PropTypes.node,
  fileType: PropTypes.string,
  url: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
};

export default DownloadFileRow;
