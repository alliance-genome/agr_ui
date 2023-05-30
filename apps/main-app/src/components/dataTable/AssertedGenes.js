import CollapsibleList from '../collapsibleList/collapsibleList';
import ExternalLink from '../ExternalLink';


function makeAssertedGeneLink(curie) {
    if(curie) {
      const name = <span dangerouslySetInnerHTML={{__html: curie}}/>;
      return <ExternalLink href={`https://www.alliancegenome.org/gene/${curie}`}>{name}</ExternalLink>;
    }
    return null;
}

function AssertedGenes({assertedGenes}) {
  if(assertedGenes && assertedGenes.length > 1) {
    return (
        <CollapsibleList collapsedSize={assertedGenes.length}>
        {assertedGenes.map(gene => makeAssertedGeneLink(gene.curie))}
        </CollapsibleList>
    );
  }
  return <></>;
}

export default AssertedGenes;