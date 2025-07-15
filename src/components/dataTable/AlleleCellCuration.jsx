import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlleleSymbol from '../../containers/allelePage/AlleleSymbol.jsx';

const AlleleCellCuration = ({ identifier, alleleSymbol }) => {
  return (
    <Link to={`/allele/${identifier}`}>
      <AlleleSymbol allele={{ symbol: alleleSymbol?.displayText }} wrap />
    </Link>
  );
};

AlleleCellCuration.propTypes = {
  identifier: PropTypes.string,
  symbol: PropTypes.string,
};

export default AlleleCellCuration;
