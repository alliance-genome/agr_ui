import { createFetchAction } from '../lib/createActions';

export const FETCH_SNAPSHOT = 'FETCH_SNAPSHOT';

// yes, this one always goes to production
export const fetchSnapshot = createFetchAction(FETCH_SNAPSHOT,
  () => `https://www.alliancegenome.org/api/data/snapshot?releaseVersion=${process.env.RELEASE}&system=production`);
