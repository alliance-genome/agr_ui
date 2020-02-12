import React from 'react';
import PropTypes from 'prop-types';

const AlleleSymbol = ({allele}) => <span dangerouslySetInnerHTML={{__html: allele.symbol}} />;

AlleleSymbol.propTypes = {
  allele: PropTypes.object,
};

export default AlleleSymbol;
