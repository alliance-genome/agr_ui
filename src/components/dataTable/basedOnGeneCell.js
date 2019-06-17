import React from 'react';
import {Link } from 'react-router-dom';
import { shortSpeciesName} from '../../lib/utils';

const BasedOnGeneCell = (gene) => {
  if(gene){
    let cell = (<Link key={gene.id} to={`/gene/${gene.id}`}>{gene.symbol}({shortSpeciesName(gene.species.taxonId)})</Link>);
    return cell;
  }
  else{
    return null;
  }
};

export default BasedOnGeneCell;
