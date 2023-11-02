import React from 'react';
import PropTypes from 'prop-types';

const GeneSymbolCuration = ({gene}) => {
  return <span dangerouslySetInnerHTML={{__html: gene.geneSymbol.displayText}} />;
};


export default GeneSymbolCuration;
