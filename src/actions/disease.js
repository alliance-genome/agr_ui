import fetchData from '../lib/fetchData';
import { buildTableQueryString } from '../lib/utils';

export const FETCH_DISEASE_SUMMARY = 'FETCH_DISEASE_SUMMARY';
export const FETCH_DISEASE_SUMMARY_SUCCESS = 'FETCH_DISEASE_SUMMARY_SUCCESS';
export const FETCH_DISEASE_SUMMARY_FAILURE = 'FETCH_DISEASE_SUMMARY_FAILURE';

export const FETCH_DISEASE = 'FETCH_DISEASE';
export const FETCH_DISEASE_SUCCESS = 'FETCH_DISEASE_SUCCESS';
export const FETCH_DISEASE_FAILURE = 'FETCH_DISEASE_FAILURE';

export const FETCH_ASSOCIATIONS = 'FETCH_ASSOCIATIONS';
export const FETCH_ASSOCIATIONS_SUCCESS = 'FETCH_ASSOCIATIONS_SUCCESS';
export const FETCH_ASSOCIATIONS_FAILURE = 'FETCH_ASSOCIATIONS_FAILURE';
/* eslint-disable no-debugger */
export const FETCH_DISEASE_ANNOTATIONS = 'FETCH_DISEASE_ANNOTATIONS';
export const FETCH_DISEASE_ANNOTATIONS_SUCCESS = 'FETCH_DISEASE_ANNOTATIONS_SUCCESS';
export const FETCH_DISEASE_ANNOTATIONS_FAILURE = 'FETCH_DISEASE_ANNOTATIONS_FAILURE';
export const fetchDiseaseSummary = (id, opts=[]) => {
  let urlStr = `/api/gene/${id}/disease-ribbon-summary`;
  if(opts.length > 0){
    urlStr += ('?' + opts.join('&'));
  }

  return (dispatch) => {
    dispatch({
      type: FETCH_DISEASE_SUMMARY,
      id,
    });
    return fetchData(urlStr)
      .then(data => dispatch(fetchDiseaseSummarySuccess(id, data)))
      .catch(error => dispatch(fetchDiseaseSummaryFailure(id, error)));
  };
};

const fetchDiseaseSummarySuccess = (id, summary) => ({
  type: FETCH_DISEASE_SUMMARY_SUCCESS,
  id,
  summary,
});

const fetchDiseaseSummaryFailure = (id, error) => ({
  type: FETCH_DISEASE_SUMMARY_FAILURE,
  id,
  error,
});


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

export const fetchAssociations = function (id, opts) {
  return (dispatch) => {
    dispatch(fetchAssociationsRequest());
    return fetchData(`/api/disease/${id}/associations?${buildTableQueryString(opts)}`)
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

export const fetchDiseaseAnnotation = function(genes, termId=undefined){
  return (dispatch) => {
    let qString =  '?';
    if(genes.length > 0){
      qString += `${genes}`;
      if (termId) {
        qString += `&termID=${termId}`;
      }
    }

    dispatch({
      type: FETCH_DISEASE_ANNOTATIONS
    });
    return fetchData(
      `/api/disease${qString}`)
      .then((data) => dispatch(fetchDiseaseAnnotationSuccess(data)))
      .catch((error) => dispatch(fetchDiseaseAnnotationFailure(error)));
  };
};

export const fetchDiseaseAnnotationSuccess = function(diseaseAnnotations){
  return {
    type: FETCH_DISEASE_ANNOTATIONS_SUCCESS,
    payload: diseaseAnnotations
  };
};

export const fetchDiseaseAnnotationFailure = function (error) {
  return {
    type: FETCH_DISEASE_ANNOTATIONS_FAILURE,
    payload: error
  };
};


