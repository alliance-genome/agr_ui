import { Link } from 'react-router-dom';

import { CollapsibleList } from '../../components/collapsibleList';
import { getIdentifier, removeDuplicates } from './utils.jsx';
import GeneSymbolCuration from '../GeneSymbolCuration.jsx';

const GeneLink = ({ gene }) => {
  const identifier = getIdentifier(gene);
  return (
    <Link key={identifier} to={`/gene/${identifier}`}>
      <GeneSymbolCuration gene={gene} />
      {gene.taxon?.species?.abbreviation && ` (${gene.taxon.species.abbreviation})`}
    </Link>
  );
};
const BasedOnGeneCellCuration = (genes) => {
  if (!genes) return null;
  const uniqueGenes = removeDuplicates(genes, (gene) => gene.geneSymbol.displayText);
  return (
    <CollapsibleList collapsedSize={uniqueGenes.length}>
      {uniqueGenes.map((gene) => (
        <GeneLink key={gene.geneSymbol.displayText} gene={gene} />
      ))}
    </CollapsibleList>
  );
};

export default BasedOnGeneCellCuration;
