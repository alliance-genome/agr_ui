/*eslint-disable no-undef */

const TIMEOUT = 5000;

export default function fetchData(_url, options={}) {
  let _type = options.type || 'GET';
  return new Promise(function (resolve, reject) {
    // *** DEPENDS ON GLOBAL $ because $ can abort ***
    $.ajax({
      url : _url,
      type : _type,
      dataType:'json',
      timeout: TIMEOUT,
      success: data => {
        resolve(data);
      },
      error: (request, e) => {
        if (e === 'abort') {
          return;
        }
        reject(e);
      }
    });
  });
}
