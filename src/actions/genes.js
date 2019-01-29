import { buildTableQueryString } from '../lib/utils';
import { createFetchAction } from '../lib/createActions';

export const FETCH_GENE = 'FETCH_GENE';
export const FETCH_ALLELES = 'FETCH_ALLELES';
export const FETCH_PHENOTYPES = 'FETCH_PHENOTYPES';

export const fetchGene = createFetchAction(FETCH_GENE, id => `/api/gene/${id}`);
export const fetchAlleles = createFetchAction(FETCH_ALLELES, id => `/api/gene/${id}/alleles`);
export const fetchPhenotypes = createFetchAction(FETCH_PHENOTYPES, (id, opts) => `/api/gene/${id}/phenotypes?${buildTableQueryString(opts)}`);
