import fetchData from '../lib/fetchData';

export const FETCH_DISEASE = 'FETCH_DISEASE';
export const FETCH_DISEASE_SUCCESS = 'FETCH_DISEASE_SUCCESS';
export const FETCH_DISEASE_FAILURE = 'FETCH_DISEASE_FAILURE';

export const fetchDisease = function (id) {
  return (dispatch) => {
    dispatch({
      type: FETCH_DISEASE,
    });
    fetchData(`/api/disease/${id}`)
      .then((data) => {
        dispatch(fetchDiseaseSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchDiseaseFailure(error));
      });
  };
};

export const fetchDiseaseSuccess = function (disease) {
  return {
    type: FETCH_DISEASE_SUCCESS,
    payload: disease,
  };
};

export const fetchDiseaseFailure = function (error) {
  return {
    type: FETCH_DISEASE_FAILURE,
    payload: error,
  };
};
