import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AlleleSymbol from '../../containers/allelePage/AlleleSymbol.jsx';

const AlleleCell = ({ allele, usePeid = false }) => {
  return allele.category === 'variant' ? (
    <Link to={`/variant/${allele.id}`}>{allele.symbol}</Link>
  ) : usePeid ? (
    <Link to={`/allele/${allele.primaryExternalId}`}>
      <AlleleSymbol allele={allele} wrap />
    </Link>
  ) : (
    <Link to={`/allele/${allele.id}`}>
        <span dangerouslySetInnerHTML={{ __html: allele.symbol }} />
    </Link>
  );
};

AlleleCell.propTypes = {
  allele: PropTypes.object,
  usePeid: PropTypes.bool,
};

export default AlleleCell;
