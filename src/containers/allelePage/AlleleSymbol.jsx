import React from 'react';
import PropTypes from 'prop-types';

const AlleleSymbol = ({ allele, wrap = false }) => (
  <span className={wrap ? 'text-break' : null} dangerouslySetInnerHTML={{ __html: allele.symbol }} />
);

AlleleSymbol.propTypes = {
  allele: PropTypes.object,
  wrap: PropTypes.bool,
};

export default AlleleSymbol;
