import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only';
import 'isomorphic-fetch';


const TIMEOUT = 30000;
const CONTROLLER = new AbortController();

//resolve promise
function fetchWrapper(url, options){
  return fetch(url, options).then(handleResponse, handleNetworkError);
}

//reject promise
function fetchTimeout(timeoutValue, signalFlag=false){
  return new Promise((resolve,reject)=>{
    let timeOut= setTimeout(()=>{
      if(signalFlag){
        CONTROLLER.abort;
      }
      clearTimeout(timeOut);
      reject(new Error('request timed out'));
    }, timeoutValue);
  });
}

function handleResponse(response){
  if(response.ok){
    return response.json();
  }
  else{
    return response.json().then(function(error){
      throw {
        msg: error.message};
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
  const SIGNAL = CONTROLLER.signal;

  let _type = options.type || 'GET';
  let headers ={
    'Content-type': 'application/json'
  };
  let requestOptions= {
    method: _type,
    mode: 'cors',
    headers: headers,
    signal: SIGNAL
  };

  if(VERBS.indexOf(_type) > -1){
    requestOptions = {
      method: _type,
      mode: 'cors',
      body: JSON.stringify(options.data),
      headers: headers,
      signal: SIGNAL
    };
  }

  let promiseRace = Promise.race([fetchTimeout(TIMEOUT, true), fetchWrapper(_url,requestOptions)]);
  return promiseRace.then((res) => {return res;}).catch(handleNetworkError);

}
