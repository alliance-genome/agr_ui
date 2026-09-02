import fetchData from './fetchData';

export const PUBLIC_API_PAGE_SIZE = 1000;

const pageUrl = (baseUrl, page) => {
  const separator = baseUrl.includes('?') ? '&' : '?';
  return `${baseUrl}${separator}page=${page}&limit=${PUBLIC_API_PAGE_SIZE}`;
};

/**
 * Fetch a complete JsonResultResponse through bounded public API pages.
 *
 * The first response supplies the stable metadata and total. Subsequent pages
 * are fetched sequentially to avoid replacing one oversized request with a
 * burst of concurrent requests.
 */
export default async function fetchAllPages(baseUrl, fetchPage = fetchData) {
  const firstPage = await fetchPage(pageUrl(baseUrl, 1));
  const firstResults = Array.isArray(firstPage?.results) ? firstPage.results : [];
  const total = firstPage?.total;

  if (!Number.isSafeInteger(total) || total < 0) {
    throw new Error('Paged API response did not contain a valid total');
  }

  const results = [...firstResults];
  const pageCount = Math.ceil(total / PUBLIC_API_PAGE_SIZE);

  for (let page = 2; page <= pageCount; page += 1) {
    const response = await fetchPage(pageUrl(baseUrl, page));
    if (!Array.isArray(response?.results)) {
      throw new Error(`Paged API response for page ${page} did not contain results`);
    }
    results.push(...response.results);
  }

  if (results.length < total) {
    throw new Error(`Paged API response was incomplete: expected ${total} records, received ${results.length}`);
  }

  return {
    ...firstPage,
    results,
    returnedRecords: results.length,
  };
}
