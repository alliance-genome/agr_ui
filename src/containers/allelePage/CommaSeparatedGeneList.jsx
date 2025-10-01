import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { shortSpeciesName } from '../../lib/utils';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import GeneSymbol from '../../components/GeneSymbol.jsx';

const MaybeLink = ({ url, children }) => {
  return url ? <Link to={url}>{children}</Link> : children;
};

MaybeLink.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string,
};

const CommaSeparatedGeneList = ({ genes }) => {
  if (!genes) {
    return null;
  }

  return (
    <CommaSeparatedList>
      {genes.map((gene) => {
        const url = gene.primaryExternalId ? `/gene/${gene.primaryExternalId}` : null;
        return (
          <MaybeLink key={gene.geneSymbol.displayText} url={url}>
            {gene.geneSymbol.displayText}
          </MaybeLink>
        );
      })}
    </CommaSeparatedList>
  );
};

CommaSeparatedGeneList.propTypes = {
  genes: PropTypes.arrayOf(
    PropTypes.shape({
        primaryExternalId: PropTypes.string,
      species: PropTypes.shape({
        taxonId: PropTypes.string,
      }),
    })
  ),
};

export default CommaSeparatedGeneList;
