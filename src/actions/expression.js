import fetchData from '../lib/fetchData';

export const FETCH_SUMMARY = 'FETCH_SUMMARY';
export const FETCH_SUMMARY_SUCCESS = 'FETCH_SUMMARY_SUCCESS';
export const FETCH_SUMMARY_FAILURE = 'FETCH_SUMMARY_FAILURE';

export const fetchExpressionSummary = (id) => {
  return (dispatch) => {
    dispatch({
      type: FETCH_SUMMARY,
      id,
    });
    return fetchData(`/api/gene/${id}/expression-summary`)
      .then(data => dispatch(fetchExpressionSummarySuccess(id, data)))
      .catch(error => dispatch(fetchExpressionSummaryFailure(id, error)));
  };
};

const fetchExpressionSummarySuccess = (id, summary) => ({
  type: FETCH_SUMMARY_SUCCESS,
  id,
  summary,
});

const fetchExpressionSummaryFailure = (id, error) => ({
  type: FETCH_SUMMARY_FAILURE,
  id,
  error,
});
