import fetchData from '../lib/fetchData';

export const FETCH_GENE = 'FETCH_GENE';
export const FETCH_GENE_SUCCESS = 'FETCH_GENE_SUCCESS';
export const FETCH_GENE_FAILURE = 'FETCH_GENE_FAILURE';

export const FETCH_ALLELE = 'FETCH_ALLELE';
export const FETCH_ALLELE_SUCCESS = 'FETCH_ALLELE_SUCCESS';
export const FETCH_ALLELE_FAILURE = 'FETCH_ALLELE_FAILURE';

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
