import fetchData from './fetchData';

function handlePagePayload(data) {
  if (data && data[0]) {
    return data[0];
  } else {
    // throw our own error, since Wordpress API doesn't return 404 when page is not found
    throw new Error('Page not found');
  }
}

export default function fetchWordpress(url) {
  return fetchData(url).then(handlePagePayload);
}
