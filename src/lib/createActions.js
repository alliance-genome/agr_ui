import fetchData from './fetchData';

export const createFetchAction = (type, url) => {
  return (id, opts) => {
    return (dispatch) => {
      dispatch({
        type: type + '_REQUEST',
      });
      fetchData(url(id, opts))
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
