import React from 'react';
import { Link } from 'react-router-dom';
import AlleleSymbol from '../../containers/allelePage/AlleleSymbol.jsx';

/**
 * @param {object} props
 * @param {string} props.identifier - The allele curie/identifier
 * @param {object} props.allele - The allele object containing symbol information
 */
const AlleleCellCuration = ({ identifier, allele }) => {
  if (!allele) return null;

  return (
    <Link to={`/allele/${identifier}`}>
      <AlleleSymbol allele={allele} wrap />
    </Link>
  );
};

export default AlleleCellCuration;
