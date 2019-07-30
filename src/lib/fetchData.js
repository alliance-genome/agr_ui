import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import 'isomorphic-fetch';

const TIMEOUT = 30000;

class ApiError extends Error {
  constructor(json) {
    super(json.errors || json.errorMessage);
    this.name = 'ApiError';
  }
}

function timeoutPromise(timeout, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('request timed out'));
    }, timeout);
    promise.then(
      (res) => {
        clearTimeout(timer);
        resolve(res);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

export default async function fetchData(url, options = {}) {
  const _type = options.type || 'GET';
  const headers = {
    'Content-Type': 'application/json'
  };
  let requestOptions= {
    method: _type,
    mode: 'cors',
    headers: headers,
    signal: options.signal
  };

  if (options.data) {
    requestOptions.body = JSON.stringify(options.data);
  }

  const response = await timeoutPromise(TIMEOUT, fetch(url, requestOptions));
  const body = await response.json();
  if (!response.ok) {
    throw new ApiError(body);
  }
  return body;
}
