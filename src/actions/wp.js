export const FETCH_WP = 'FETCH_WP';
export const FETCH_WP_SUCCESS = 'FETCH_WP_SUCCESS';
export const FETCH_WP_FAILURE = 'FETCH_WP_FAILURE';

export const fetchWp = function () {
  return {
    type: FETCH_WP,
  };
};

export const fetchWpSuccess = function (wp) {
  return {
    type: FETCH_WP_SUCCESS,
    payload: wp,
  };
};

export const fetchWpFailure = function (error) {
  return {
    type: FETCH_WP_FAILURE,
    payload: error,
  };
};
