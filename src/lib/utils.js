import { STRINGENCY_HIGH, STRINGENCY_MED } from '../components/orthology/constants';

export function makeId(string) {
  return string.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
}

export function stripHtml (string) {
  if (!string) {
    return '';
  }
  return string.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>?/gi, '').trim();
}

export function compareAlphabeticalCaseInsensitive(accessor) {
  accessor = accessor || (val => val);
  return function (a, b) {
    return accessor(a).toLowerCase().localeCompare(accessor(b).toLowerCase());
  };
}

export function buildTableQueryString(options) {
  const filterQueries = options.filters.length ?
    ('&' + options.filters.map(filter => `${filter.name}=${filter.value}`).join('&')) : '';
  const sortOrderQuery = options.sort.order ? `&asc=${options.sort.order === 'asc'}` : '';
  return `page=${options.page}&limit=${options.limit}&sortBy=${options.sort.name}${sortOrderQuery}${filterQueries}`;
}

function isHighStringency(orthology) {
  return (
    orthology.predictionMethodsMatched.indexOf('ZFIN') > -1 ||
    orthology.predictionMethodsMatched.indexOf('HGNC') > -1 ||
    (orthology.predictionMethodsMatched.length > 2 && (orthology.isBestScore || orthology.isBestRevScore)) ||
    (orthology.predictionMethodsMatched.length === 2 && orthology.isBestScore && orthology.isBestRevScore)
  );
}

function isModerateStringency(orthology) {
  return (
    orthology.predictionMethodsMatched.indexOf('ZFIN') > -1 ||
    orthology.predictionMethodsMatched.indexOf('HGNC') > -1 ||
    orthology.predictionMethodsMatched.length > 2 ||
    (orthology.predictionMethodsMatched.length === 2 && orthology.isBestScore && orthology.isBestRevScore)
  );
}

export function orthologyMeetsStringency(orthology, stringency) {
  switch (stringency) {
  case STRINGENCY_HIGH:
    return isHighStringency(orthology);
  case STRINGENCY_MED:
    return isModerateStringency(orthology);
  default:
    return true;
  }
}

export function filterOrthologyByStringency(orthologyList, stringency) {
  return orthologyList.filter(o => orthologyMeetsStringency(o, stringency));
}

export function shortSpeciesName(taxonId) {
  const shortNames = {
    'NCBITaxon:9606': 'Hsa',
    'NCBITaxon:10116': 'Rno',
    'NCBITaxon:10090': 'Mmu',
    'NCBITaxon:7955': 'Dre',
    'NCBITaxon:7227': 'Dme',
    'NCBITaxon:6239': 'Cel',
    'NCBITaxon:4932': 'Sce',
  };
  return shortNames[taxonId];
}
