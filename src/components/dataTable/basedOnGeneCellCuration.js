import { Link } from 'react-router-dom';
import { shortSpeciesName } from '../../lib/utils';
import { CollapsibleList } from '../../components/collapsibleList';
import { removeDuplicates } from './utils';
import GeneSymbolCuration from '../GeneSymbolCuration';

const BasedOnGeneCellCuration = (genes) => {
  if (!genes) {
    return null;
  }
  const uniqueGenes = removeDuplicates(genes, (gene) => gene.geneSymbol.displayText);
  return (
    <CollapsibleList collapsedSize={uniqueGenes.length}>
      {uniqueGenes.map(gene => (
        <Link key={gene.curie} to={`/gene/${gene.curie}`}>
          <GeneSymbolCuration gene={gene} /> ({shortSpeciesName(gene.taxon.curie)})
        </Link>
      ))}
    </CollapsibleList>
  );
};

export default BasedOnGeneCellCuration;
