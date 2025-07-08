import React from 'react';
import PropTypes from 'prop-types';

const GeneSymbol = ({ gene }) => {
  return <span dangerouslySetInnerHTML={{ __html: gene.symbol }} />;
};

GeneSymbol.propTypes = {
  gene: PropTypes.shape({
    symbol: PropTypes.string,
  }),
};

export default GeneSymbol;
