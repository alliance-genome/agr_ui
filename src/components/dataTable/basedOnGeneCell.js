import React from 'react';
import {Link } from 'react-router-dom';
import { shortSpeciesName} from '../../lib/utils';
import { CollapsibleList } from '../../components/collapsibleList';

const BasedOnGeneCell = (genes) => {
  if(genes){
    let cell = (
      <CollapsibleList collapsedSize={genes.length}>
        {genes.map(gene => (
          <Link
            key={gene.id}
            to={`/gene/${gene.id}`}
          >{gene.symbol}({shortSpeciesName(gene.species.taxonId)})
          </Link>
        ))}

      </CollapsibleList>);
    return cell;
  }
  else{
    return null;
  }
};

export default BasedOnGeneCell;
