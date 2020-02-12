export const PAGE_LOADING = 'PAGE_LOADING';

export const setPageLoading = loading => {
  return {
    type: PAGE_LOADING,
    payload: loading,
  };
};
