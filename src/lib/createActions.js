import fetchData from './fetchData';

export const createFetchAction = (type, url) => {
  return (...params) => {
    return (dispatch) => {
      dispatch({
        type: type + '_REQUEST',
      });
      fetchData(url(...params))
        .then((data) => dispatch({
          type: type + '_SUCCESS',
          payload: data,
        }))
        .catch((error) => dispatch({
          type: type + '_FAILURE',
          payload: error,
        }));
    };
  };
};
