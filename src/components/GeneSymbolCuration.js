import React from 'react';

const GeneSymbolCuration = ({gene}) => {
  return <span dangerouslySetInnerHTML={{__html: gene.geneSymbol.displayText}} />;
};


export default GeneSymbolCuration;
