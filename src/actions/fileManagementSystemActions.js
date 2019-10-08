import {createFetchAction} from '../lib/createActions';

export const FETCH_RELEASE_FILES = 'FETCH_CURRENT_RELEASE_FILES';

export const fetchReleaseFiles = createFetchAction(
  FETCH_RELEASE_FILES,
  (release) => `https://fms.alliancegenome.org/api/datafile/by/release/${release}?latest=true`
);
