import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {shortSpeciesName} from '../../lib/utils';
import CommaSeparatedList from '../../components/commaSeparatedList';
import GeneSymbol from '../../components/GeneSymbol';

const MaybeLink = ({url, children}) => {
  return url ? <Link to={url}>{children}</Link> : children;
};

MaybeLink.propTypes = {
  children: PropTypes.node,
  url: PropTypes.string,
};

const CommaSeparatedGeneList = ({genes}) => {
  if (!genes) {
    return null;
  }

  return (
    <CommaSeparatedList>
      {
        genes.map(gene => {
          const url = gene.id ? `/gene/${gene.id}` : null;
          return (
            <MaybeLink key={gene.symbol} url={url}>
              <GeneSymbol gene={gene} />
              {gene.species && ` (${shortSpeciesName(gene.species.taxonId)})`}
            </MaybeLink>
          );
        })
      }
    </CommaSeparatedList>
  );
};

CommaSeparatedGeneList.propTypes = {
  genes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    symbol: PropTypes.string.isRequired,
    species: PropTypes.shape({
      taxonId: PropTypes.string,
    })
  }))
};

export default CommaSeparatedGeneList;
