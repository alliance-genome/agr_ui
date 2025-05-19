import React from 'react';
import { compareAlphabeticalCaseInsensitive } from '../../lib/utils';
import { getResourceUrl } from "./getResourceUrl.jsx";
import { smartAlphaSort } from '../../lib/utils';

export const renderPaginationShowsTotal = (start, end, total) => {
  return <span>Showing { start } - { end } of { total?.toLocaleString() } rows</span>;
};

export const getDistinctFieldValue = (supplementalData, field) => {
  if(!supplementalData) return [];
  const {distinctFieldValues = {}} = supplementalData || {};
  return (distinctFieldValues[field] || [])
    .sort(compareAlphabeticalCaseInsensitive)
     // TODO: remove when backend is fixed, see https://agr-jira.atlassian.net/browse/SCRUM-2649
    .map(simplifySpeciesNameSC)
    .filter((value) => (
      value && value.trim()
    ));
};
export const getIsViaOrthology = (annotation) => {
  return annotation.generatedRelationString.includes("orthology");
};
export const getIdentifier = (subject) => {
  if(!subject) return;
  return subject.curie ? subject.curie : (subject.primaryExternalId ? subject.primaryExternalId : subject.modInternalId);
}

export const getSingleReferenceUrl = (pubModId) => {
  let url;
  if(pubModId.includes("PMID") || pubModId.includes("ORPHA")|| pubModId.includes("MIM")){
    url = getResourceUrl({identifier: pubModId});
  } else {
    url = getResourceUrl({identifier: pubModId, type: "reference"});
  }
  return {pubModId, url};
}

export const getMultipleReferencesUrls = (pubModIds) => {
  return pubModIds.sort().map((pubModId) => getSingleReferenceUrl(pubModId));
}

const buildProvider = (annotation) => {
  if(!annotation) return;
  return {
    dataProvider: {
      sourceOrganization: annotation.dataProvider,
      crossReference: annotation.dataProviderCrossReference
    },
    secondaryDataProvider:
    {
      sourceOrganization: annotation.secondaryDataProvider,
      crossReference: annotation.secondaryDataProviderCrossReference
    }
  }
}

export const buildProviders = (annotations) => {
  if(!annotations) return;
  return annotations.map(annotation => {
    return buildProvider(annotation);
  });
}

export const buildProviderWithUrl = (annotation) => {

  const { dataProvider, secondaryDataProvider } = buildProvider(annotation);
  if(secondaryDataProvider.sourceOrganization){
    return {
      dataProvider: {
          id: dataProvider.id,
          abbreviation: dataProvider.sourceOrganization?.abbreviation,
          url: buildSourceUrl(dataProvider)
      },
      secondaryDataProvider: {
          id: secondaryDataProvider.id,
          abbreviation: secondaryDataProvider.sourceOrganization?.abbreviation,
          url: buildSourceUrl(secondaryDataProvider)
      },
    }
  } else {
    return {
      dataProvider: {
          id: dataProvider.id,
          abbreviation: dataProvider.sourceOrganization?.abbreviation,
          url: buildSourceUrl(dataProvider)
      },
    }
  }
}

export const buildProvidersWithUrl = (annotations) => {
  if(!annotations) return;

  return annotations.map((annotation) => {
    return buildProviderWithUrl(annotation)
  })
}

const getReferencedCurie = (dataProvider) => {
  if(!dataProvider) return;

  const abbreviation = dataProvider.sourceOrganization?.abbreviation;
  const referencedCurie = dataProvider.crossReference?.referencedCurie;

  const modPrefixException = [ "OMIM", "SGD", "MGI", ];

  if(modPrefixException.includes(abbreviation)) return referencedCurie?.split(":")[1];

  return referencedCurie;
}

export const buildSourceUrl = (dataProvider) => {
  if(!dataProvider) return;

  //default to mod homepage if no crossReference is provided
  if(!dataProvider.crossReference) return dataProvider.sourceOrganization?.homepageResourceDescriptorPage?.urlTemplate?.replace("[%s]", "");

  const urlTemplate = dataProvider.crossReference?.resourceDescriptorPage?.urlTemplate;
  const referencedCurie = getReferencedCurie(dataProvider);
  const url = urlTemplate?.replace("[%s]", `${referencedCurie}`)

  return url;
}

// TODO: remove when the data is fixed on the backend
// see https://agr-jira.atlassian.net/browse/SCRUM-2649
export function simplifySpeciesNameSC(speciesName) {
  const SC = 'Saccharomyces cerevisiae'
  if( speciesName.startsWith(SC))
    return SC;
  else
    return speciesName;

}

//takes an array of objects and a function that returns the approprate subField and returns a unique set of those objects
export function removeDuplicates(objects, keyFunction){
  const newArray = objects.map((object) => [keyFunction(object), object]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const uniqueObjects = [...iterator];

  return uniqueObjects;
}

//takes an array of disease/phenotype annotations and returns the array of annotations naturally sorted by the annotation subject symbol/name
export function naturalSortByAnnotationSubject(annotations) {
  return annotations.sort(smartAlphaSort(annotation => getAnnotationSubject(annotation)));
}

export function getAnnotationSubject(annotation) {
  if (annotation.type === "AGMDiseaseAnnotation") {
    return annotation.diseaseAnnotationSubject.name;
  } else if (annotation.type === 'AlleleDiseaseAnnotation') {
    return annotation.diseaseAnnotationSubject.alleleSymbol.displayText;
  } else if(annotation.type === 'GeneDiseaseAnnotation'){
    return annotation.diseaseAnnotationSubject.geneSymbol.displayText;
  } else if(annotation.type === 'AGMPhenotypeAnnotation'){
    return annotation.phenotypeAnnotationSubject.name;
  } else if(annotation.type === 'AllelePhenotypeAnnotation'){
    return annotation.phenotypeAnnotationSubject.alleleSymbol.displayText;
  } else if(annotation.type === 'GenePhenotypeAnnotation'){
    return annotation.phenotypeAnnotationSubject.geneSymbol.displayText;
  } else {
    return null;
  }
}
