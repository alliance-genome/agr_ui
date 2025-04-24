import React from 'react';
import { CellTooltip } from '../dataTable';
//import ExternalLink from '../externalLink';

export default function MITerm({name, definition, id} = {}) {
  if (!name) {
    return null;
  }

  if (definition) {
    //const url = `https://www.ebi.ac.uk/ols/ontologies/mi/terms?iri=http%3A%2F%2Fpurl.obolibrary.org%2Fobo%2F${primaryKey.replace(/\W+/, '_')}`;
    // return <ExternalLink href={url}>{TERMS[primaryKey] || label}</ExternalLink>;
    return (
      <CellTooltip id={id} tooltip={definition}>
        {name}
      </CellTooltip>
    );
  } else {
    return name;
  }
}
