import React from 'react';
import PropTypes from 'prop-types';

const GeneSymbolCuration = ({ gene }) => {
  return <span dangerouslySetInnerHTML={{ __html: gene.geneSymbol?.displayText }} />;
};

GeneSymbolCuration.propTypes = {
  gene: PropTypes.shape({
    geneSymbol: PropTypes.shape({
      displayText: PropTypes.string,
    }),
  }),
};

export default GeneSymbolCuration;
