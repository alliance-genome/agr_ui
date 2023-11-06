import React from 'react';
import clone from 'lodash.clone';
import without from 'lodash.without';
import {Link} from 'react-router-dom';
import ExternalLink from '../components/ExternalLink';
import qs from 'qs';

const SINGLE_VAL_FIELDS = ['mode', 'page'];
const CLEARING_FIELDS = ['category'];

const IGNORED_PARAMS = ['page', 'mode', 'q', 'category'];


export function makeValueDisplayName(unformattedName) {
  unformattedName = unformattedName || '';

  if(isExcluded(unformattedName)){
    unformattedName = removeExclude(unformattedName);
  }

  switch(unformattedName) {
  case 'biological_process':
    return 'biological process';
  case 'molecular_function':
    return 'molecular function';
  case 'cellular_component':
    return 'cellular component';
  default:
    return unformattedName.replace(/_/g, ' ');
  }
}

export function isExcluded(value) {
  if(value){
    return value.charAt(0) === '-';

  }
}

export function removeExclude(value){
  return value.substring(1);
}

export function makeFieldDisplayName(unformattedName, category = '') {

  const suffixesToRemove = ['WithParents','AgrSlim'];

  unformattedName = unformattedName || '';

  suffixesToRemove.forEach(function(suffix) {
    unformattedName = unformattedName.replace(suffix,'');
  });

  unformattedName = unformattedName.replace('name_key', 'Symbol');
  unformattedName = unformattedName.replace('collapsible_', '');

  if(category === 'dataset'){
    if(unformattedName.toLowerCase() === 'expression' ){
      unformattedName = 'Cell/Tissues';
    }

    if(unformattedName.toLowerCase() === 'anatomicalexpression'){
      unformattedName = 'Tissues';
    }
  }

  switch(unformattedName) {
  case 'go':
    return 'Gene Ontology';
  case 'go_type':
  case 'go_branch':
    return 'GO Branch';
  case 'geneType':
    return 'Gene Type';
  case 'disease_genes':
  case 'go_genes':
    return 'Associated Genes';
  case 'disease_species':
  case 'go_species':
    return 'Associated Species';
  case 'dnaChangeTypes':
    return 'DNA Change Types';
  case 'primaryKey':
    return 'Source';
  case 'primaryId':
  case 'idCollection':
    return 'ID';
  case 'secondaryIds':
    return 'Secondary ID';
  case 'crossReferenceLinks':
  case 'external_ids':
    return 'Cross References';
  case 'diseases.name':
    return 'Disease';
  case 'soTermName':
    return 'Biotype';
  case 'annotations.geneDocument.Symbol':
    return 'Gene';
  case 'annotations.geneDocument.species':
    return 'Associated Species';
  case 'geneDocument.species':
    return 'Species';
  case 'geneDocument.Symbol':
    return 'Gene';
  case 'geneDocument.name':
    return 'Gene';
  case 'diseaseDocuments.name':
    return 'Associated Disease';
  case 'featureDocument.name':
    return 'Allele';
  case 'allele.name':
    return 'Allele';
  case 'nameText':
    return 'Name';
  case 'symbolText':
    return 'Symbol';
  case 'variantType':
    return 'Variant Type';
  case 'variantName':
    return 'Variant Name';
  case 'alterationType':
    return 'Category\u00a0'; //non breaking whitespace char in order to avoid conflict with higher level category value
  default:
    //replace fix both camel case and underscores, capitalize the first letter
    return unformattedName
      .replace( /([A-Z])/g, ' $1' )
      .replace(/_/g, ' ')
      .replace(/\.(\w)+/g, '')
      .replace(/^\w/, c => c.toUpperCase());
  }
}

export function makeTitleCaseFieldDisplayName(unformattedName) {
  return toTitleCase(makeFieldDisplayName(unformattedName));
}

export function strikeThroughLabelNode(labelNode) {
  return <s>{labelNode}</s>;
}

export function getQueryParamWithoutPage(key, val, queryParams) {
  let pagelessQp = getQueryParamWithValueChanged('page', [], queryParams, true);
  return getQueryParamWithValueChanged(key, val, pagelessQp);
}

export function getQueryParamWithValueChanged(key, val, queryParams, isClear=false) {
  let qp = clone(queryParams || {});
  let oldVal = clone(qp[key]);
  let isSingleValField = (SINGLE_VAL_FIELDS.indexOf(key) > -1);
  if (isSingleValField || oldVal === null || typeof oldVal === 'undefined') {
    qp[key] = val;
    return qp;
  }
  if (typeof oldVal !== 'object') {
    oldVal = [oldVal];
  }
  let newVal;
  if (oldVal.indexOf(val) > -1) {
    newVal = without(oldVal, val);
  } else {
    newVal = oldVal;
    if (Array.isArray(val)) {
      newVal = val;
    } else {
      newVal.push(val);
    }
  }
  qp[key] = newVal;
  if (CLEARING_FIELDS.indexOf(key) > -1) {
    qp = { q: qp.q };
    qp[key] = newVal;
    if (isClear) {
      delete qp[key];
    }
    return qp;
  }
  return qp;
}

export const getURLForEntry = (category, id, alterationType) => {

  switch (category) {
  case 'gene':
    return `/gene/${id}`;
  case 'disease':
    return `/disease/${id}`;
  case 'allele':
    if(alterationType === 'variant'){
      return `/variant/${id}`;
    }
    return `/allele/${id}`;
  default:
    return "";
  }
};

export function getLinkForEntry(entry) {
  let entryText;
  if(entry.category === 'allele' && entry.alterationType === 'variant'){
    if(entry.variantName){
      entryText = entry.variantName;
    }else{
      entryText = entry.display_name;
    }
  } else{
    entryText = entry.display_name;
  }
  const inner = <span dangerouslySetInnerHTML={{ __html: entryText }} />;
  const url = entry.alterationType ? getURLForEntry(entry.category , entry.id, entry.alterationType) : getURLForEntry(entry.category, entry.id);
  if (url) {
    return <Link to={url}>{inner}</Link>;
  } else {
    return <ExternalLink href={entry.href}>{inner}</ExternalLink>;
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function parseQueryString(queryString) {
  return qs.parse(queryString, {
    ignoreQueryPrefix: true,
  });
}

//adds a '-' to the beginning of a query parameter to indicate that it should be excluded
export function markAsExcluded(queryObject, value){
  //used for deep cloning
  let qp = JSON.parse(JSON.stringify(queryObject)) || {};
  const qKeys = Object.keys(qp)
    .filter( d => IGNORED_PARAMS.indexOf(d) < 0);

  let newValue = '-' + value.name;

  qKeys.find(key =>{
    if(Array.isArray(qp[key])){
      if(qp[key].find(item => item === value.name)){
        qp[key] = qp[key].filter(item => item !== value.name);
        qp[key].push(newValue);
      }
    }else{
      if(qp[key] === value.name){
        qp[key] = newValue;
      }
    }
  });

  return qp;
}

export function stringifyQuery(query) {
  return qs.stringify(query, {
    arrayFormat: 'repeat',
  });
}

export function toCamelCase(string){
  let stringArr = string.split(' ');
  for(let i = 1; i < stringArr.length; i++ ){
    stringArr[i] = stringArr[i].charAt(0).toUpperCase() + stringArr[i].slice(1);
  }
  return stringArr.join('');
}

export function isBlankValue(value){
  return value.displayName === '';
}

export function removeBlankValue(values){
  return values.filter(value => !isBlankValue(value));
}
