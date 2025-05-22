import React from 'react';
import PropTypes from 'prop-types';
import { parseQueryString } from '../../lib/searchHelpers';
import { useDownloadPost } from '../../hooks/useDownloadPost';

const DownloadButton = ({ downloadUrl, text, disabled = false, method = 'GET', body }) => {
  const { mutate, isLoading } = useDownloadPost();

  const handleClick = () => {
    if (method === 'POST') {
      const [baseUrl, queryString] = downloadUrl.split('?');
      // Use the body prop if provided, otherwise fallback to parsed params (legacy)
      let params = body !== undefined ? body : parseQueryString(queryString || '');
      mutate(
        { url: baseUrl, body: params },
        {
          onSuccess: (blob, variables, context) => {
            // Try to get filename from content-disposition header
            let filename = 'download';
            if (context && context.response) {
              const disposition = context.response.headers.get('content-disposition');
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
          },
          // Pass response in context for onSuccess
          onSettled: (data, error, variables, context) => {},
          // Override mutationFn to return both blob and response
          mutationFn: async ({ url, body }) => {
            const response = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(body),
            });
            if (!response.ok) {
              throw new Error('Download failed');
            }
            const blob = await response.blob();
            // Attach response to context for onSuccess
            return Object.assign(blob, { response });
          },
        }
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
