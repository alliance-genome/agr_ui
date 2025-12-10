import React from 'react';
import CollapsibleList from '../collapsibleList/collapsibleList.jsx';
import { Link } from 'react-router-dom';
import { getIdentifier } from './utils.jsx';

/**
 * Creates a link to a gene page with the gene symbol as the link text.
 * @param {string} identifier - The gene identifier (curie, primaryExternalId, or modInternalId)
 * @param {string} geneSymbol - The HTML string for the gene symbol to display
 * @returns {JSX.Element|null} A Link component to the gene page, or null if no identifier
 */
function makeAssertedGeneLink(identifier, geneSymbol) {
  if (identifier) {
    const symbol = <span dangerouslySetInnerHTML={{ __html: geneSymbol }} />;
    return <Link to={`/gene/${identifier}`}>{symbol}</Link>;
  }
  return null;
}

/**
 * Renders a collapsible list of links to additional implicated genes.
 * Filters out the main row's gene to avoid redundant display.
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.assertedGenes - Array of gene objects with geneSymbol and identifier properties
 * @param {string} [props.mainRowCurie] - The identifier of the main row's gene to exclude from the list
 * @returns {JSX.Element} A CollapsibleList of gene links, or empty fragment if no genes to display
 */
function AssertedGenes({ assertedGenes, mainRowCurie }) {
  if (!assertedGenes || assertedGenes.length === 0) return <></>;

  const filteredAssertedGenes = assertedGenes.filter((gene) => getIdentifier(gene) !== mainRowCurie);

  if (filteredAssertedGenes.length === 0) return <></>;

  return (
    <CollapsibleList collapsedSize={filteredAssertedGenes.length}>
      {filteredAssertedGenes.map((gene) => {
        const identifier = getIdentifier(gene);
        return (
          <React.Fragment key={identifier}>
            {makeAssertedGeneLink(identifier, gene.geneSymbol?.displayText)}
          </React.Fragment>
        );
      })}
    </CollapsibleList>
  );
}

export default AssertedGenes;
