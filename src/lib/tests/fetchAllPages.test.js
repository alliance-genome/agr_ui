import fetchAllPages, { PUBLIC_API_PAGE_SIZE } from '../fetchAllPages';

describe('fetchAllPages', () => {
  test('returns a single complete page with bounded query parameters', async () => {
    const fetchPage = jest.fn().mockResolvedValue({
      results: ['one', 'two'],
      total: 2,
      returnedRecords: 2,
      requestDate: 'test-date',
    });

    await expect(fetchAllPages('/api/example?filter=all', fetchPage)).resolves.toEqual({
      results: ['one', 'two'],
      total: 2,
      returnedRecords: 2,
      requestDate: 'test-date',
    });
    expect(fetchPage).toHaveBeenCalledWith(`/api/example?filter=all&page=1&limit=${PUBLIC_API_PAGE_SIZE}`);
    expect(fetchPage).toHaveBeenCalledTimes(1);
  });

  test('fetches every page sequentially and combines the results', async () => {
    const firstResults = Array.from({ length: PUBLIC_API_PAGE_SIZE }, (_, index) => `first-${index}`);
    const secondResults = Array.from({ length: 434 }, (_, index) => `second-${index}`);
    const fetchPage = jest
      .fn()
      .mockResolvedValueOnce({ results: firstResults, total: 1434, returnedRecords: 1000 })
      .mockResolvedValueOnce({ results: secondResults, total: 1434, returnedRecords: 434 });

    const response = await fetchAllPages('/api/example', fetchPage);

    expect(fetchPage.mock.calls).toEqual([
      [`/api/example?page=1&limit=${PUBLIC_API_PAGE_SIZE}`],
      [`/api/example?page=2&limit=${PUBLIC_API_PAGE_SIZE}`],
    ]);
    expect(response.results).toHaveLength(1434);
    expect(response.returnedRecords).toBe(1434);
    expect(response.total).toBe(1434);
  });

  test('rejects an invalid total instead of guessing pagination', async () => {
    const fetchPage = jest.fn().mockResolvedValue({ results: [], total: '2' });

    await expect(fetchAllPages('/api/example', fetchPage)).rejects.toThrow('valid total');
  });

  test('rejects an incomplete final result instead of silently truncating', async () => {
    const firstResults = Array.from({ length: PUBLIC_API_PAGE_SIZE }, (_, index) => `first-${index}`);
    const fetchPage = jest
      .fn()
      .mockResolvedValueOnce({ results: firstResults, total: 1002 })
      .mockResolvedValueOnce({ results: ['last'], total: 1002 });

    await expect(fetchAllPages('/api/example', fetchPage)).rejects.toThrow('expected 1002 records, received 1001');
  });
});
