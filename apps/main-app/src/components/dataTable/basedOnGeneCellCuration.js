import { Link } from 'react-router-dom';
import { shortSpeciesName} from '../../lib/utils';
import { CollapsibleList } from '../../components/collapsibleList';
import GeneSymbolCuration from '../GeneSymbolCuration';

const BasedOnGeneCellCuration = (genes) => {
  if (!genes) {
    return null;
  }
  return (
    <CollapsibleList collapsedSize={genes.length}>
      {genes.map(gene => (
        <Link key={gene.curie} to={`/gene/${gene.curie}`}>
          <GeneSymbolCuration gene={gene} /> ({shortSpeciesName(gene.taxon.curie)})
        </Link>
      ))}
    </CollapsibleList>
  );
};

export default BasedOnGeneCellCuration;
