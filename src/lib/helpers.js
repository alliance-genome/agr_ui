/*module containing helper functions */

export function isExternalUrl(url){
  if(url){
    let domain = url => {
      return url.replace('http://', '').replace('https://', '').split('/')[0];
    };

    return !domain(location.href) !== domain(url);
  }
  return false;

}
