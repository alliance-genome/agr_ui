import CollapsibleList from '../collapsibleList/collapsibleList.jsx';
import { Link } from 'react-router-dom';
import { getIdentifier } from './utils.jsx';

function makeAssertedGeneLink(identifier, geneSymbol) {
  if (identifier) {
    const symbol = <span dangerouslySetInnerHTML={{ __html: geneSymbol }} />;
    return <Link to={`/gene/${identifier}`}>{symbol}</Link>;
  }
  return null;
}

function AssertedGenes({ assertedGenes, mainRowCurie }) {
  const filteredAssertedGenes = assertedGenes?.filter((gene) => getIdentifier(gene) !== mainRowCurie);
  if (assertedGenes && assertedGenes.length > 1) {
    return (
      <CollapsibleList collapsedSize={assertedGenes.length}>
        {filteredAssertedGenes.map((gene) => makeAssertedGeneLink(getIdentifier(gene), gene.geneSymbol.displayText))}
      </CollapsibleList>
    );
  }
  return <></>;
}

export default AssertedGenes;
