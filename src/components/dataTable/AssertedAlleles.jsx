import React from 'react';
import CollapsibleList from '../collapsibleList/collapsibleList.jsx';
import { Link } from 'react-router-dom';
import { getIdentifier } from './utils.jsx';

/**
 * Creates a link to an allele page with the allele symbol as the link text.
 * @param {string} identifier - The allele identifier (curie, primaryExternalId, or modInternalId)
 * @param {string} alleleSymbol - The HTML string for the allele symbol to display
 * @returns {JSX.Element|null} A Link component to the allele page, or null if no identifier
 */
function makeAssertedAlleleLink(identifier, alleleSymbol) {
  if (identifier) {
    const symbol = <span dangerouslySetInnerHTML={{ __html: alleleSymbol }} />;
    return <Link to={`/allele/${identifier}`}>{symbol}</Link>;
  }
  return null;
}

/**
 * Renders a collapsible list of links to additional implicated alleles.
 * Filters out the main row's allele to avoid redundant display.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.assertedAlleles - Array of allele objects with alleleSymbol and identifier properties
 * @param {string} [props.mainRowCurie] - The identifier of the main row's allele to exclude from the list
 * @returns {JSX.Element} A CollapsibleList of allele links, or empty fragment if no alleles to display
 */
function AssertedAlleles({ assertedAlleles, mainRowCurie }) {
  if (!assertedAlleles || assertedAlleles.length === 0) return <></>;

  const filteredAssertedAlleles = assertedAlleles.filter((allele) => getIdentifier(allele) !== mainRowCurie);

  if (filteredAssertedAlleles.length === 0) return <></>;

  return (
    <CollapsibleList collapsedSize={filteredAssertedAlleles.length}>
      {filteredAssertedAlleles.map((allele) => {
        const identifier = getIdentifier(allele);
        return (
          <React.Fragment key={identifier}>
            {makeAssertedAlleleLink(identifier, allele.alleleSymbol?.displayText)}
          </React.Fragment>
        );
      })}
    </CollapsibleList>
  );
}

export default AssertedAlleles;
