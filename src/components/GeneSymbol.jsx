import React from 'react';
import PropTypes from 'prop-types';

const GeneSymbol = ({ symbol }) => {
  return <span dangerouslySetInnerHTML={{ __html: symbol }} />;
};

GeneSymbol.propTypes = {
    symbol: PropTypes.string,
};

export default GeneSymbol;
