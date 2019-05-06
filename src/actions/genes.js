import { buildTableQueryString } from '../lib/utils';
import { createFetchAction } from '../lib/createActions';

export const FETCH_GENE = 'FETCH_GENE';
export const FETCH_ORTHOLOGS = 'FETCH_ORTHOLOGS';
export const FETCH_ALLELES = 'FETCH_ALLELES';
export const FETCH_PHENOTYPES = 'FETCH_PHENOTYPES';
export const FETCH_DISEASE_VIA_EMPIRICAL = 'FETCH_DISEASE_VIA_EMPIRICAL';
export const FETCH_DISEASE_VIA_ORTHOLOGY = 'FETCH_DISEASE_VIA_ORTHOLOGY';
export const FETCH_INTERACTIONS = 'FETCH_INTERACTIONS';

export const fetchGene = createFetchAction(FETCH_GENE, id => `/api/gene/${id}`);
export const fetchOrthologs =createFetchAction(FETCH_ORTHOLOGS, id => `/api/gene/${id}/homologs?stringencyFilter=all`);
export const fetchAlleles = createFetchAction(
  FETCH_ALLELES,
  (id, opts) => `/api/gene/${id}/alleles?${buildTableQueryString(opts)}`
);
export const fetchPhenotypes = createFetchAction(
  FETCH_PHENOTYPES,
  (id, opts) => `/api/gene/${id}/phenotypes?${buildTableQueryString(opts)}`
);
export const fetchDiseaseViaEmpirical = createFetchAction(
  FETCH_DISEASE_VIA_EMPIRICAL,
  (id, opts) => `/api/gene/${id}/diseases-by-experiment?${buildTableQueryString(opts)}`
);
export const fetchDiseaseViaOrthology = createFetchAction(
  FETCH_DISEASE_VIA_ORTHOLOGY,
  (id, opts) => `/api/gene/${id}/diseases-via-orthology?${buildTableQueryString(opts)}`
);
export const fetchInteractions = createFetchAction(FETCH_INTERACTIONS, id => `/api/gene/${id}/interactions`);
