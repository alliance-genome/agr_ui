import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {shortSpeciesName} from '../../lib/utils';
import CommaSeparatedList from '../../components/commaSeparatedList';

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
            <Link key={gene.symbol} to={url}>
              {gene.symbol}
              {gene.species && ` (${shortSpeciesName(gene.species.taxonId)})`}
            </Link>
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
