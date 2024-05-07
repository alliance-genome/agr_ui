import { resourceDescriptors } from "../../resourceDescriptors";

export const getResourceUrl = ({ curie, type, subtype }) => {
  const [prefix, id] = curie.split(':');

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
    [resource] = resourceDescriptors
        .find(resource => resource.db_prefix === prefix)?.default_url
        .split('[')
        || [];
  }
  return resource + id;
}

export const getResourceUrls = (curies) => {
  return curies.map(curie => getResourceUrl(curie));
}
