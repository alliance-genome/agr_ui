import fetchData from '../lib/fetchData';
import { buildTableQueryString } from '../lib/utils';

export const FETCH_GENE = 'FETCH_GENE';
export const FETCH_GENE_SUCCESS = 'FETCH_GENE_SUCCESS';
export const FETCH_GENE_FAILURE = 'FETCH_GENE_FAILURE';

export const FETCH_ALLELE = 'FETCH_ALLELE';
export const FETCH_ALLELE_SUCCESS = 'FETCH_ALLELE_SUCCESS';
export const FETCH_ALLELE_FAILURE = 'FETCH_ALLELE_FAILURE';

export const FETCH_PHENOTYPES = 'FETCH_PHENOTYPES';
export const FETCH_PHENOTYPES_SUCCESS = 'FETCH_PHENOTYPES_SUCCESS';
export const FETCH_PHENOTYPES_FAILURE = 'FETCH_PHENOTYPES_FAILURE';

export const fetchGene = function (id) {
  return (dispatch) => {
    dispatch({
      type: FETCH_GENE,
    });
    fetchData(`/api/gene/${id}`)
      .then((data) => dispatch(fetchGeneSuccess(data)))
      .catch((error) => dispatch(fetchGeneFailure(error)));
  };
};

export const fetchGeneSuccess = function (gene) {
  return {
    type: FETCH_GENE_SUCCESS,
    payload: gene,
  };
};

export const fetchGeneFailure = function (error) {
  return {
    type: FETCH_GENE_FAILURE,
    payload: error,
  };
};

export const fetchAlleles = function (id) {
  return (dispatch) => {
    dispatch({
      type: FETCH_ALLELE,
    });
    return fetchData(`/api/gene/${id}/alleles`)
      .then((data) => dispatch(fetchAlleleSuccess(data)))
      .catch((error) => dispatch(fetchAlleleFailure(error)));
  };
};

export const fetchAlleleSuccess = function (alleles) {
  return {
    type: FETCH_ALLELE_SUCCESS,
    payload: alleles,
  };
};

export const fetchAlleleFailure = function (error) {
  return {
    type: FETCH_ALLELE_FAILURE,
    payload: error,
  };
};

export const fetchPhenotypes = function (id, opts) {
  return (dispatch) => {
    dispatch({
      type: FETCH_PHENOTYPES,
    });
    return fetchData(`/api/gene/${id}/phenotypes?${buildTableQueryString(opts)}`)
      .then((data) => dispatch(fetchPhenotypesSuccess(data)))
      .catch((error) => dispatch(fetchPhenotypesFailure(error)));
  };
};

export const fetchPhenotypesSuccess = function (phenotypes) {
  return {
    type: FETCH_PHENOTYPES_SUCCESS,
    payload: phenotypes,
  };
};

export const fetchPhenotypesFailure = function (error) {
  return {
    type: FETCH_PHENOTYPES_FAILURE,
    payload: error,
  };
};
