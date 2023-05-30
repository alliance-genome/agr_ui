import CollapsibleList from '../collapsibleList/collapsibleList';
import ExternalLink from '../ExternalLink';


function makeAssertedGeneLink(curie, geneSymbol) {
    if(curie) {
      const symbol = <span dangerouslySetInnerHTML={{__html: geneSymbol}}/>;
      return <ExternalLink href={`https://www.alliancegenome.org/gene/${curie}`}>{symbol}</ExternalLink>;
    }
    return null;
}

function AssertedGenes({assertedGenes}) {
  console.log("asserted genes", assertedGenes)
  if(assertedGenes && assertedGenes.length > 1) {
    return (
        <CollapsibleList collapsedSize={assertedGenes.length}>
        {assertedGenes.map(gene => makeAssertedGeneLink(gene.curie, gene.geneSymbol.displayText))}
        </CollapsibleList>
    );
  }
  return <></>;
}

export default AssertedGenes;