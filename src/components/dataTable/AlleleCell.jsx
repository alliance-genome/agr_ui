import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlleleSymbol from '../../containers/allelePage/AlleleSymbol.jsx';

const AlleleCell = ({ allele }) => {
  return allele.category === 'variant' ? (
    <Link to={`/variant/${allele.id}`}>{allele.symbol}</Link>
  ) : (
    <Link to={`/allele/${allele.id}`}>
      <AlleleSymbol allele={allele} wrap />
    </Link>
  );
};

AlleleCell.propTypes = {
  allele: PropTypes.object,
};

export default AlleleCell;
