export const FETCH_GENE = 'FETCH_GENE';
export const FETCH_GENE_SUCCESS = 'FETCH_GENE_SUCCESS';
export const FETCH_GENE_FAILURE = 'FETCH_GENE_FAILURE';

export const fetchGene = function () {
  return {
    type: FETCH_GENE,
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
