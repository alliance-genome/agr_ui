import React from 'react';
import PropTypes from 'prop-types';
import {Link } from 'react-router-dom';
import { shortSpeciesName} from '../../lib/utils';
import { CollapsibleList } from '../../components/collapsibleList';
import GeneSymbol from '../GeneSymbol';

const BasedOnGeneCellCuration = (genes) => {
  if (!genes) {
    return null;
  }
  return (
    <CollapsibleList collapsedSize={genes.length}>
      {genes.map(gene => (
        <Link key={gene.curie} to={`/gene/${gene.curie}`}>
          <GeneSymbol gene={gene} /> ({shortSpeciesName(gene.taxon.curie)})
        </Link>
      ))}
    </CollapsibleList>
  );
};

export default BasedOnGeneCellCuration;
