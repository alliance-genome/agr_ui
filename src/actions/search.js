export function clearError () {
  return {
    type: 'SEARCH_ERROR',
    payload: false
  };
}

export function receiveResponse (response, _queryParams, _category='none') {
  return {
    type: 'SEARCH_RESPONSE',
    payload: response,
    category: _category,
    queryParams: _queryParams
  };
}

export function setError (message) {
  return {
    type: 'SEARCH_ERROR',
    payload: message
  };
}

export function setPending (isPending) {
  return {
    type: 'SEARCH_SET_PENDING',
    payload: isPending
  };
}
