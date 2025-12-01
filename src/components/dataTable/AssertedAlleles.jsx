import CollapsibleList from '../collapsibleList/collapsibleList.jsx';
import { Link } from 'react-router-dom';
import { getIdentifier } from './utils.jsx';


function makeAssertedAlleleLink(identifier, alleleSymbol) {
  if (identifier) {
    const symbol = <span dangerouslySetInnerHTML={{ __html: alleleSymbol }} />;
    return <Link to={`/allele/${identifier}`}>{symbol}</Link>;
  }
  return null;
}

function AssertedAlleles({ assertedAlleles }) {
  if (!assertedAlleles || assertedAlleles.length == 0) return <></>;

  return (
    <CollapsibleList collapsedSize={assertedAlleles.length}>
      {assertedAlleles.map((allele) => makeAssertedAlleleLink(getIdentifier(allele), allele.alleleSymbol.displayText))}
    </CollapsibleList>
  );

}

export default AssertedAlleles;
