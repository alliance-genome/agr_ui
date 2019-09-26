import { buildTableQueryString } from '../lib/utils';
import {createFetchAction} from '../lib/createActions';

export const FETCH_DISEASE = 'FETCH_DISEASE';
export const FETCH_GENE_ASSOCIATIONS = 'FETCH_GENE_ASSOCIATIONS';
export const FETCH_ALLELE_ASSOCIATIONS = 'FETCH_ALLELE_ASSOCIATIONS';
export const FETCH_MODEL_ASSOCIATIONS = 'FETCH_MODEL_ASSOCIATIONS';

export const fetchDisease = createFetchAction(FETCH_DISEASE, id => `/api/disease/${id}`);
export const fetchGeneAssociations = createFetchAction(
  FETCH_GENE_ASSOCIATIONS,
  (id, opts) => `/api/disease/${id}/genes?${buildTableQueryString(opts)}`
);
export const fetchAlleleAssociations = createFetchAction(
  FETCH_ALLELE_ASSOCIATIONS,
  (id, opts) => `/api/disease/${id}/alleles?${buildTableQueryString(opts)}`
);
export const fetchModelAssociations = createFetchAction(
  FETCH_MODEL_ASSOCIATIONS,
  (id, opts) => `/api/disease/${id}/models?${buildTableQueryString(opts)}`
);
