import React from 'react';
import PropTypes from 'prop-types';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import { Link } from 'react-router-dom';
import AlleleSymbol from './AlleleSymbol.jsx';
import SynonymListCuration from '../../components/SynonymListCuration.jsx';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import GeneSymbol from '../../components/GeneSymbol.jsx';
import SpeciesName from '../../components/SpeciesName.jsx';
import DataSourceLinkCuration from '../../components/dataSourceLinkCuration.jsx';
import GeneSymbolCuration from '../../components/GeneSymbolCuration.jsx';
import { getSpeciesNameCorrected } from '../../lib/utils.js';

const AlleleSummary = ({
  allele,
  category,
  description,
  crossReference,
  alleleOfGene,
  constructSlimList
}) => {

  const speciesName = getSpeciesNameCorrected(allele.taxon?.name);

  return (
    <AttributeList>
      <AttributeLabel>Species</AttributeLabel>
      <AttributeValue>
        <SpeciesName>{speciesName}</SpeciesName>
      </AttributeValue>

      <AttributeLabel>Symbol</AttributeLabel>
      <AttributeValue>
        <AlleleSymbol allele={allele} />
      </AttributeValue>

      <AttributeLabel>Category</AttributeLabel>
      <AttributeValue>{category === 'allele_summary' ? 'allele' : null}</AttributeValue>

      <AttributeLabel>Allele of gene</AttributeLabel>
      <AttributeValue placeholder="None">
        {alleleOfGene && (
          <Link to={`/gene/${alleleOfGene.primaryExternalId}`}>
            <GeneSymbolCuration gene={alleleOfGene} />
          </Link>
        )}
      </AttributeValue>

      <AttributeLabel>Transgenic Constructs</AttributeLabel>
      <AttributeValue placeholder="None">
        {constructSlimList && constructSlimList.length && (
          <CommaSeparatedList>
            {constructSlimList.map((construct) => (
              <DataSourceLinkCuration key={construct.primaryExternalId} reference={construct.dataProviderCrossReference}>
                <span dangerouslySetInnerHTML={{ __html: construct.constructSymbol?.displayText }} />
              </DataSourceLinkCuration>
            ))}
          </CommaSeparatedList>
        )}
      </AttributeValue>

      <AttributeLabel>Synonyms</AttributeLabel>
      <AttributeValue placeholder="None">
        {allele.alleleSynonyms && allele.alleleSynonyms.length && <SynonymListCuration synonyms={allele.alleleSynonyms} />}
      </AttributeValue>

      <AttributeLabel>Description</AttributeLabel>
      <AttributeValue>
        {description && <span dangerouslySetInnerHTML={{ __html: description }} />}
      </AttributeValue>

      <AttributeLabel>Additional Information</AttributeLabel>
      <AttributeValue>
        {crossReference && (
          <DataSourceLinkCuration reference={crossReference}>Literature</DataSourceLinkCuration>
        )}
      </AttributeValue>
    </AttributeList>
  );
};

AlleleSummary.propTypes = {
  allele: PropTypes.object,
};

export default AlleleSummary;
