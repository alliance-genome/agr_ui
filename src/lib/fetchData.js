import $ from 'jquery';

const TIMEOUT = 30000;

export default function fetchData(_url, options={}) {
  let _type = options.type || 'GET';
  return $.ajax({
    url : _url,
    type : _type,
    dataType:'json',
    timeout: TIMEOUT,
  });
}
