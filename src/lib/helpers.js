export function isExternalUrl(url, tmp){
  if(url){
    let domain = url => {
      return url.replace('http://', '').replace('https://', '').split('/')[0];
    };
    if(url.includes('http')){
      return domain(tmp) !== domain(url);
    }
    else{
      return false;
    }
  }
  return false;
}
