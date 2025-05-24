import React from 'react';
import PropTypes from 'prop-types';
import { useDownloadPost } from '../../hooks/useDownloadPost';

const DownloadButton = ({ downloadUrl, text, disabled = false, method = 'GET', body }) => {
  const { mutate, isLoading } = useDownloadPost();

  const triggerFileDownload = (data) => {
    const { blob, response } = data;

    let filename = 'download';
    if (response) {
      const disposition = response.headers.get('content-disposition');
      if (disposition) {
        const match = disposition.match(/filename="?([^";]+)"?/);
        if (match && match[1]) {
          filename = match[1];
        }
      }
    }
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleClick = () => {
    if (method === 'POST') {

      mutate(
        { url: downloadUrl, body: body },
        { onSuccess: triggerFileDownload }
      );
    } else {
      window.location.replace(downloadUrl);
    }
  };

  return (
    <button
      className={'btn btn-outline-secondary'}
      onClick={handleClick}
      disabled={disabled || isLoading}
    >
      {isLoading ? 'Downloading...' : text}
    </button>
  );
};

DownloadButton.propTypes = {
  downloadUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
  disabled: PropTypes.bool,
  method: PropTypes.oneOf(['GET', 'POST']),
  body: PropTypes.any,
};

DownloadButton.defaultProps = {
  text: 'Download',
  method: 'GET',
};

export default DownloadButton;
