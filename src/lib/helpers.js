export function isExternalUrl(url){
  if(url){
    let domain = url => {
      return url.replace('http://', '').replace('https://', '').split('/')[0];
    };
    if(url.includes('http')){
      return domain(location.href) !== domain(url);
    }
    else{
      return false;
    }

  }
  return false;
}
