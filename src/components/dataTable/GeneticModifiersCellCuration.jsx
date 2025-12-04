import React from 'react';
import { CollapsibleList } from '../collapsibleList';
import ExternalLink from '../ExternalLink.jsx';
import { getResourceUrl } from './getResourceUrl.jsx';
import { Link } from 'react-router-dom';
import { getIdentifier } from './utils.jsx';
import ModelCellCuration from './ModelCellCuration.jsx';
import GeneCellCuration from './GeneCellCuration.jsx';
import AlleleCellCuration from './AlleleCellCuration.jsx';

function GeneticModifierLink(modifier) {
  const identifier = getIdentifier(modifier);
  switch (modifier?.type) {
    case 'Gene':
      if (modifier.geneSymbol) {
        return <GeneCellCuration curie={identifier} geneSymbol={modifier.geneSymbol}/>
      }
      break;
    case 'Allele':
      return <AlleleCellCuration allele={modifier} identifier={identifier}/>
    case 'AffectedGenomicModel':
      return <ModelCellCuration model={modifier}/>
    default:
      return <></>;
  }
  return <></>;
}

function GeneticModifiersCellCuration({ relation, modifiers }) {
  if (relation && modifiers?.length > 0) {
    return (
      <dl>
        <>
          <dt>{relation.name?.replace(/_/, ' ')}:</dt>
          <dd>
            <CollapsibleList collapsedSize={modifiers.length}>{modifiers.map(GeneticModifierLink)}</CollapsibleList>
          </dd>
        </>
      </dl>
    );
  }
  return <></>;
}

export default GeneticModifiersCellCuration;
