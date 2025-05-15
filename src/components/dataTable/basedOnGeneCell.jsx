import React from 'react';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import { shortSpeciesName} from '../../lib/utils';
import { CollapsibleList } from '../../components/collapsibleList';
import GeneSymbol from '../GeneSymbol.jsx';

const BasedOnGeneCell = (genes) => {
  if (!genes) {
    return null;
  }
  return (
    <CollapsibleList collapsedSize={genes.length}>
      {genes.map(gene => (
        <Link key={gene.id} to={`/gene/${gene.id}`}>
          <GeneSymbol gene={gene} /> ({shortSpeciesName(gene.species.taxonId)})
        </Link>
      ))}
    </CollapsibleList>
  );
};

BasedOnGeneCell.propTypes = {
  genes: PropTypes.arrayOf(PropTypes.object),
};

export default BasedOnGeneCell;
