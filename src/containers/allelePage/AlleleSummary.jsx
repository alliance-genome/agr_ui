import React from 'react';
import PropTypes from 'prop-types';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import { Link } from 'react-router-dom';
import AlleleSymbol from './AlleleSymbol.jsx';
import SynonymListCuration from '../../components/SynonymListCuration.jsx';
import CommaSeparatedList from '../../components/commaSeparatedList.jsx';
import GeneSymbol from '../../components/GeneSymbol.jsx';
import SpeciesName from '../../components/SpeciesName.jsx';

const AlleleSummary = ({
  allele,
  category,
  description,
}) => {

  return (
    <AttributeList>
      <AttributeLabel>Species</AttributeLabel>
      <AttributeValue>
        <SpeciesName>{allele.taxon.name}</SpeciesName>
      </AttributeValue>

      <AttributeLabel>Symbol</AttributeLabel>
      <AttributeValue>
        <AlleleSymbol allele={allele} />
      </AttributeValue>

      <AttributeLabel>Category</AttributeLabel>
      <AttributeValue>{category === 'allele_summary' ? 'allele' : null}</AttributeValue>

      <AttributeLabel>Allele of gene</AttributeLabel>
      <AttributeValue placeholder="None">
        {allele.gene && (
          <Link to={`/gene/${allele.gene.id}`}>
            <GeneSymbol gene={allele.gene} />
          </Link>
        )}
      </AttributeValue>

      <AttributeLabel>Transgenic Constructs</AttributeLabel>
      <AttributeValue placeholder="None">
        {allele.constructs && allele.constructs.length && (
          <CommaSeparatedList>
            {allele.constructs.map((construct) => (
              <DataSourceLink key={construct.id} reference={construct.crossReferenceMap?.primary}>
                <span dangerouslySetInnerHTML={{ __html: construct.name }} />
              </DataSourceLink>
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
        {allele.crossReferenceMap.references && (
          <DataSourceLink reference={allele.crossReferenceMap.references}>Literature</DataSourceLink>
        )}
      </AttributeValue>
    </AttributeList>
  );
};

AlleleSummary.propTypes = {
  allele: PropTypes.object,
};

export default AlleleSummary;
