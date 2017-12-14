import fetchData from '../lib/fetchData';

export const FETCH_DISEASE = 'FETCH_DISEASE';
export const FETCH_DISEASE_SUCCESS = 'FETCH_DISEASE_SUCCESS';
export const FETCH_DISEASE_FAILURE = 'FETCH_DISEASE_FAILURE';

export const FETCH_ASSOCIATIONS = 'FETCH_ASSOCIATIONS';
export const FETCH_ASSOCIATIONS_SUCCESS = 'FETCH_ASSOCIATIONS_SUCCESS';
export const FETCH_ASSOCIATIONS_FAILURE = 'FETCH_ASSOCIATIONS_FAILURE';

export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_PER_PAGE_SIZE = 'SET_PER_PAGE_SIZE';
export const SET_SORT = 'SET_SORT';

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

export const fetchAssociations = function (id, page = 1, limit = 10, sortName = 'default', sortOrder = 'asc') {
  // TODO: this is a hack because the API JSON field names don't line up with
  // the URL query param names. So we rectify them here. It might be better to
  // do it as part of the table column definition.
  switch(sortName) {
  case 'diseaseName':
    sortName = 'disease';
    break;

  case 'disease_species':
    sortName = 'species';
    break;

  case 'geneDocument':
    sortName = 'gene';
    break;
  }
  return (dispatch) => {
    dispatch(fetchAssociationsRequest());
    return fetchData(`/api/disease/${id}/associations?page=${page}&limit=${limit}&sortBy=${sortName}&asc=${ sortOrder === 'asc' ? true : false }`)
      .then((data) => dispatch(fetchAssociationsSuccess(data)))
      .catch((error) => dispatch(fetchAssociationsFailure(error)));
  };
};

export const fetchAssociationsRequest = function() {
  return {
    type: FETCH_ASSOCIATIONS
  };
};

export const fetchAssociationsSuccess = function (associations) {
  return {
    type: FETCH_ASSOCIATIONS_SUCCESS,
    payload: associations,
  };
};

export const fetchAssociationsFailure = function (error) {
  return {
    type: FETCH_ASSOCIATIONS_FAILURE,
    payload: error,
  };
};

export const setCurrentPage = function(page) {
  return {
    type: SET_CURRENT_PAGE,
    payload: page
  };
};

export const setPerPageSize = function(perPageSize) {
  return {
    type: SET_PER_PAGE_SIZE,
    payload: perPageSize
  };
};

export const setSort = function (name, order) {
  return {
    type: SET_SORT,
    payload: {
      name,
      order,
    }
  };
};
