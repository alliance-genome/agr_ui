import React from 'react';
import PropTypes from 'prop-types';
import DownloadFileLink from './downloadFileLink.jsx';

const DownloadFileRow = ({ description, files }) => {
  // remove any undefined entries in the array
  files = files.filter((u) => u);

  if (files.length === 0) return null;

  return (
    <tr>
      <td>{description}</td>
      <td style={{ whiteSpace: 'nowrap' }}>
        {files.map((file) => (
          <DownloadFileLink fileType={file.fileType} key={file.id} url={file.stableURL} size={file.size} />
        ))}
      </td>
    </tr>
  );
};

DownloadFileRow.propTypes = {
  description: PropTypes.node,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      stableURL: PropTypes.string,
      fileType: PropTypes.string,
      size: PropTypes.number,
    })
  ),
};

export default DownloadFileRow;
