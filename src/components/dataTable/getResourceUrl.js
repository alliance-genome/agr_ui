import { resourceDescriptors } from "../../resourceDescriptors";

export const getResourceUrl = ({ identifier, type, subtype }) => {
  let [prefix, id] = identifier?.split(':');

  if(prefix.toLowerCase() === 'dip') {
    id = id.replace(/\D/g,'');
  }
  let resource;
  if(subtype){
    [resource] = resourceDescriptors
        .find(resource => resource.db_prefix === prefix)?.pages
        .find(page => page.name === subtype.name.toLowerCase())?.url
        .split('[')
        || [];
  } else if(type){
    [resource] = resourceDescriptors
        .find(resource => resource.db_prefix === prefix)?.pages
        .find(page => page.name === type.toLowerCase())?.url
        .split('[')
        || [];
  } else {
    if(prefix === 'ORPHA') {
      prefix = 'Orphanet';
    }
    [resource] = resourceDescriptors
        .find(resource => resource.db_prefix === prefix)?.default_url
        .split('[')
        || [];
  }
  return resource + id;
}

export const getResourceUrls = (identifiers) => {
  return identifiers?.map(curie => getResourceUrl(curie));
}
