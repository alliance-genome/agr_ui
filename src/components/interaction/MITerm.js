import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from '../externalLink';

export default function MITerm({primaryKey, label}) {
  if (label) {
    const url = `https://www.ebi.ac.uk/ols/ontologies/mi/terms?iri=http%3A%2F%2Fpurl.obolibrary.org%2Fobo%2F${primaryKey.replace(/\W+/, '_')}`;
    return (
      <ExternalLink href={url}>{label}</ExternalLink>
    );
  } else {
    return null;
  }
}

MITerm.propTypes = {
  label: PropTypes.string.isRequired,
  primaryKey: PropTypes.string.isRequired,
};
