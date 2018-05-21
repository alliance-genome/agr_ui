import React from 'react';
import clone from 'lodash.clone';
import without from 'lodash.without';
import { Link } from 'react-router-dom';
import ExternalLink from '../components/externalLink';

const SINGLE_VAL_FIELDS = ['mode', 'page'];
const CLEARING_FIELDS = ['category'];

export function makeFieldDisplayName(unformattedName) {
  unformattedName = unformattedName || '';

  unformattedName = unformattedName.replace('name_key', 'Symbol');

  switch(unformattedName) {
  case 'go':
    return 'Gene Ontology';
  case 'go_type':
  case 'go_branch':
    return 'GO Branch';
  case 'biological_process':
  case 'gene_biological_process':
    return 'Biological Process';
  case 'cellular_component':
  case 'gene_cellular_component':
    return 'Cellular Component';
  case 'molecular_function':
  case 'gene_molecular_function':
    return 'Molecular Function';
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
  case 'crossReferences.generic_cross_reference.name':
    return 'Cross References';
  case 'crossReferences.ontology_provided_cross_reference.name':
    return 'Cross References';
  case 'crossReferences.generic_cross_reference.localId':
    return 'Cross References';
  case 'crossReferences.ontology_provided_cross_reference.localId':
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
  default:
    //replace underscores and any field name suffixes after a ., capitalize
    return unformattedName.replace(/_/g, ' ').replace(/\.(\w)+/g, '');
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

export function getLinkForEntry(entry) {
  const inner = <span dangerouslySetInnerHTML={{ __html: entry.display_name }} />;
  switch (entry.category) {
  case 'gene':
    return <Link to={`/gene/${entry.id}`}>{inner}</Link>;
  case 'disease':
    return <Link to={`/disease/${entry.id}`}>{inner}</Link>;
  default:
    return <ExternalLink href={entry.href}>{inner}</ExternalLink>;
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
