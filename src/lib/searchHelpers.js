import _ from 'underscore';

const SINGLE_VAL_FIELDS = ['mode', 'page'];
const CLEARING_FIELDS = ['category'];

export function makeFieldDisplayName(unformattedName) {
  unformattedName = unformattedName || '';
  switch(unformattedName) {
  case 'go':
    return 'Gene Ontology';
  case 'go_type':
  case 'go_branch':
    return 'GO Branch';
  case 'omim_id':
    return 'OMIM ID';
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
  default:
    return unformattedName.replace(/_/g, ' ');
  }
}

export function getQueryParamWithoutPage(key, val, queryParams) {
  let pagelessQp = getQueryParamWithValueChanged('page', [], queryParams, true);
  return getQueryParamWithValueChanged(key, val, pagelessQp);
}

export function getQueryParamWithValueChanged(key, val, queryParams, isClear=false) {
  let qp = _.clone(queryParams || {});
  let oldVal = _.clone(qp[key]);
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
    newVal = _.without(oldVal, val);
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
