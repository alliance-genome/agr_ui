import {createFetchAction} from '../lib/createActions';

export const FETCH_ALLELE = 'FETCH_ALLELE';

export const fetchAllele = createFetchAction(FETCH_ALLELE, id => `/api/allele/${id}`);
