import React from 'react';
import PropTypes from 'prop-types';
import { CellTooltip } from '../dataTable';
//import ExternalLink from '../externalLink';

const TERMS = {
  'IA:2966': 'dsRNA',
  'IA:2984': 'miRNA',
  'MI:0250': 'gene',
  'MI:0318': 'nucleic acid',
  'MI:0319': 'DNA',
  'MI:0320': 'RNA',
  'MI:0324': 'mRNA',
  'MI:0325': 'tRNA',
  'MI:0326': 'protein',
  'MI:0327': 'peptide',
  'MI:0607': 'snRNA',
  'MI:0608': 'rRNA',
  'MI:0609': 'snoRNA',
  'MI:0610': 'siRNA',
  'MI:0611': 'SRP RNA',
  'MI:0681': 'dsDNA',
  'MI:2190': 'lincRNA',
};

export default function MITerm({primaryKey, label, definition, id} = {}) {
  const displayName = TERMS[primaryKey] || label || primaryKey;
  if (!primaryKey && !label) {
    return null;
  }

  if (definition) {
    //const url = `https://www.ebi.ac.uk/ols/ontologies/mi/terms?iri=http%3A%2F%2Fpurl.obolibrary.org%2Fobo%2F${primaryKey.replace(/\W+/, '_')}`;
    // return <ExternalLink href={url}>{TERMS[primaryKey] || label}</ExternalLink>;
    return (
      <CellTooltip id={id} tooltip={definition}>
        {displayName}
      </CellTooltip>
    );
  } else {
    return displayName;
  }
}

MITerm.propTypes = {
  definition: PropTypes.string,
  id: PropTypes.any,
  label: PropTypes.string.isRequired,
  primaryKey: PropTypes.string.isRequired,
};
