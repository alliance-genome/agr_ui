import { resourceDescriptors } from "../../../../../dist/resourceDescriptors";

export const getResourceUrl = (curie, type) => {
  const [prefix, id] = curie.split(':');

  if(type === "AffectedGenomicModel" ){
		if(prefix === "MGI") type = "genotype";
		if(prefix === "ZFIN") type = "fish";
		if(prefix === "WB") {
			if(curie.includes("genotype")) type = "genotype";
			if(curie.includes("strain")) type = "strain";
		}
		if(prefix === "RGD") type = "strain";
  }
  let resource;
  if(!type){
    [resource] = resourceDescriptors
        .filter(resource => resource.db_prefix === prefix)[0].default_url
        .split('[');
  } else {
    [resource] = resourceDescriptors
        .filter(resource => resource.db_prefix === prefix)[0].pages
        .filter(page => page.name === type.toLowerCase())[0].url
        .split('[');
  }
  return resource + id;
}

export const getResourceUrls = (curies) => {
  return curies.map(curie => getResourceUrl(curie));
}
