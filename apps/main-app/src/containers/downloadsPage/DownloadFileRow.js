import React from 'react';
import PropTypes from 'prop-types';
import DownloadFileLink from './downloadFileLink';

const DownloadFileRow = ({description, files}) => {
  // remove any undefined entries in the array
  files = files.filter(u => u);

  return (
    <tr>
      <td>{description}</td>
      <td>
        {files.map(file => (
          <DownloadFileLink
            fileType={file.dataType.fileExtension}
            key={file.id}
            url={file.stableURL}
          />
        ))}
      </td>
    </tr>
  );
};

DownloadFileRow.propTypes = {
  description: PropTypes.node,
  files: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    stableURL: PropTypes.string,
    dataType: PropTypes.shape({
      fileExtension: PropTypes.string,
    }),
  })),
};

export default DownloadFileRow;
