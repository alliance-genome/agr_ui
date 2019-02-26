import 'isomorphic-fetch';
import assert from 'assert';
import fetchData from '../fetchData';
/* eslint-disable no-console */

const REMOTE_API_URL = process.env.API_URL ? `${process.env.API_URL}/api`:
  'https://build.alliancegenome.org/api';

describe('Fetch random gene(HGNC:7526)', () => {
  it('should return gene object', async() => {
    await fetchData(`${REMOTE_API_URL}/gene/HGNC:7526`)
      .then((res) => {
        assert.equal(res.id, 'HGNC:7526');
      });
  });
});
