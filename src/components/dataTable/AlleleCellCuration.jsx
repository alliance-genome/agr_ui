import React from 'react';
import { Link } from 'react-router-dom';
import AlleleSymbol from '../../containers/allelePage/AlleleSymbol.jsx';
import { getIdentifier } from './utils.jsx';

/**
 * @param {object} props
 * @param {string} props.identifier - The allele curie/identifier
 * @param {object} props.allele - The allele object containing symbol information
 */
const AlleleCellCuration = ({ identifier, allele }) => {
  if (!allele) return null;

  let alleleIdentifier = identifier || getIdentifier(allele);

  return (
    <Link to={`/allele/${alleleIdentifier}`}>
      <AlleleSymbol allele={allele} wrap />
    </Link>
  );
};

export default AlleleCellCuration;
