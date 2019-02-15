require('isomorphic-fetch');
import assert from 'assert';
import fetchData from '../fetchData';

const REMOTE_API_URL = 'https://build.alliancegenome.org/api/';

describe('Fetch random gene(HGNC:7526)', () => {
  it('should return gene object', async() => {
    await fetchData(`${REMOTE_API_URL}gene/HGNC:7526`)
      .then((res) => {
        assert.equal(res.id, 'HGNC:7526');
      });
  });
});

