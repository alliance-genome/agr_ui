import CollapsibleList from '../collapsibleList/collapsibleList';
import { Link } from 'react-router-dom';


function makeAssertedGeneLink(curie, geneSymbol) {
    if(curie) {
      const symbol = <span dangerouslySetInnerHTML={{__html: geneSymbol}}/>;
      return <Link to={`/gene/${curie}`}>{symbol}</Link>;
    }
    return null;
}

function AssertedGenes({assertedGenes, mainRowCurie}) {
  const filteredAssertedGenes = assertedGenes?.filter(gene => gene.curie !== mainRowCurie);
  if(assertedGenes && assertedGenes.length > 1) {
    return (
        <CollapsibleList collapsedSize={assertedGenes.length}>
          {filteredAssertedGenes.map(gene => makeAssertedGeneLink(gene.curie, gene.geneSymbol.displayText))}
        </CollapsibleList>
    );
  }
  return <></>;
}

export default AssertedGenes;