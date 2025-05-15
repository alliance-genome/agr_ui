import { Link } from 'react-router-dom';
import { shortSpeciesName } from '../../lib/utils';
import { CollapsibleList } from '../../components/collapsibleList';
import { getIdentifier, removeDuplicates } from './utils';
import GeneSymbolCuration from '../GeneSymbolCuration.jsx';

const GeneLink = ({ gene }) => {
  const identifier = getIdentifier(gene);
  return (
    <Link key={identifier} to={`/gene/${identifier}`}>
      <GeneSymbolCuration gene={gene} /> ({shortSpeciesName(gene.taxon.curie)})
    </Link>);
};
const BasedOnGeneCellCuration = (genes) => {
  if (!genes) return null;
  const uniqueGenes = removeDuplicates(genes, (gene) => gene.geneSymbol.displayText);
  return (
    <CollapsibleList collapsedSize={uniqueGenes.length}>
      {uniqueGenes.map(gene => <GeneLink key={gene.geneSymbol.displayText} gene={gene} /> )}
    </CollapsibleList>
  );
};

export default BasedOnGeneCellCuration;
