import { resourceDescriptors } from "../../../../../dist/resourceDescriptors";

export const getResourceUrl = (curie, type, subtype ) => {
  const [prefix, id] = curie.split(':');

  if(type === "AffectedGenomicModel" && !subtype){
    subtype = {};
		if(prefix === "MGI") subtype.name = "genotype";
		if(prefix === "ZFIN") subtype.name = "fish";
		if(prefix === "WB") {
			if(curie.toLowerCase().includes("genotype")) subtype.name = "genotype";
			if(curie.toLowerCase().includes("strain")) subtype.name = "strain";
		}
		if(prefix === "RGD") subtype.name = "strain";
  }

  let resource;
  if(subtype){
    [resource] = resourceDescriptors
        .filter(resource => resource.db_prefix === prefix)[0].pages
        .filter(page => page.name === subtype.name.toLowerCase())[0].url
        .split('[');
  } else if(type){
    [resource] = resourceDescriptors
        .filter(resource => resource.db_prefix === prefix)[0].pages
        .filter(page => page.name === type.toLowerCase())[0].url
        .split('[');
  } else {
    [resource] = resourceDescriptors
        .filter(resource => resource.db_prefix === prefix)[0].default_url
        .split('[');
  }
  return resource + id;
}

export const getResourceUrls = (curies) => {
  return curies.map(curie => getResourceUrl(curie));
}
