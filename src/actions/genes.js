import fetchData from '../lib/fetchData';

export const FETCH_GENE = 'FETCH_GENE';
export const FETCH_GENE_SUCCESS = 'FETCH_GENE_SUCCESS';
export const FETCH_GENE_FAILURE = 'FETCH_GENE_FAILURE';

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
