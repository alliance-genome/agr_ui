function fetchWrapper(url, options){
  return fetch(url, options).then(handleResponse, handleNetworkError);
}

function handleResponse(response){
  if(response.ok){
    return response.json();
  }
  else{
    return response.json().then(function(error){
      throw error;
    });
  }
}

function handleNetworkError(error){
  throw {
    msg: error.message
  };
}

export default function fetchData(_url, options = {}) {
  const VERBS = ['POST', 'PUT', 'DELETE'];
  let _type = options.type || 'GET';
  let headers ={
    'Content-type': 'application/json'
  };

  if(VERBS.indexOf(_type) > -1){
    return fetchWrapper(_url, {
      method: _type,
      mode: 'cors',
      body: JSON.stringify(options.data),
      headers: headers
    });
  }
  else{
    return fetchWrapper(_url, {
      method: _type,
      mode: 'cors',
      headers: headers,
    });
  }
}
