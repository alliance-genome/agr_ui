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

function AssertedAlleles({ assertedAlleles, mainRowCurie }) {
  if (!assertedAlleles || assertedAlleles.length === 0) return <></>;

  const filteredAssertedAlleles = assertedAlleles.filter((allele) => getIdentifier(allele) !== mainRowCurie);

  if (filteredAssertedAlleles.length === 0) return <></>;

  return (
    <CollapsibleList collapsedSize={filteredAssertedAlleles.length}>
      {filteredAssertedAlleles.map((allele) =>
        makeAssertedAlleleLink(getIdentifier(allele), allele.alleleSymbol?.displayText)
      )}
    </CollapsibleList>
  );
}

export default AssertedAlleles;
