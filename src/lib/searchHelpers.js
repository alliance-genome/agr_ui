import React from 'react';
import clone from 'lodash.clone';
import without from 'lodash.without';
import { Link } from 'react-router-dom';
import ExternalLink from '../components/externalLink';

const SINGLE_VAL_FIELDS = ['mode', 'page'];
const CLEARING_FIELDS = ['category'];

export function makeValueDisplayName(unformattedName) {
  unformattedName = unformattedName || '';

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

export function makeFieldDisplayName(unformattedName) {

  const suffixesToRemove = ['WithParents','AgrSlim'];

  unformattedName = unformattedName || '';

  suffixesToRemove.forEach(function(suffix) {
    unformattedName = unformattedName.replace(suffix,'');
  });

  unformattedName = unformattedName.replace('name_key', 'Symbol');
  unformattedName = unformattedName.replace('collapsible_', '');


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
  case 'id':
    return 'ID';
  case 'primaryId':
    return 'ID';
  case 'secondaryIds':
    return 'Secondary ID';
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

export const getURLForEntry = (category, id) => {
  switch (category) {
  case 'gene':
    return `/gene/${id}`;
  case 'disease':
    return `/disease/${id}`;
  case 'allele':
    return `/allele/${id}`;
  }
};

export function getLinkForEntry(entry) {
  const inner = <span dangerouslySetInnerHTML={{ __html: entry.display_name }} />;
  const url = getURLForEntry(entry.category, entry.id);
  if (url) {
    return <Link to={url}>{inner}</Link>;
  } else {
    return <ExternalLink href={entry.href}>{inner}</ExternalLink>;
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
