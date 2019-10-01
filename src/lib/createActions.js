import fetchData from './fetchData';

export const createFetchAction = (type, url) => {
  let abortController = null;
  return (...params) => {
    return (dispatch) => {
      dispatch({
        type: type + '_REQUEST',
      });
      if (abortController) {
        abortController.abort();
      }
      abortController = new AbortController();
      return fetchData(url(...params), {signal: abortController.signal})
        .then((data) => dispatch({
          type: type + '_SUCCESS',
          payload: data,
        }))
        .catch((error) => {
          if (error.name === 'AbortError') {
            return;
          }
          dispatch({
            type: type + '_FAILURE',
            payload: error,
          });
        });
    };
  };
};
