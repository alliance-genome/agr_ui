import React from 'react';
import PropTypes from 'prop-types';
import {
  AttributeLabel,
  AttributeList,
  AttributeValue
} from '../../components/attribute';
import {Link} from 'react-router-dom';
import AlleleSymbol from './AlleleSymbol';
import SynonymList from '../../components/synonymList';
import DataSourceLink from '../../components/dataSourceLink';
import CommaSeparatedList from '../../components/commaSeparatedList';
import GeneSymbol from '../../components/GeneSymbol';
import SpeciesName from '../../components/SpeciesName';

const AlleleSummary = ({allele}) => {
  return (
    <AttributeList>
      <AttributeLabel>Species</AttributeLabel>
      <AttributeValue><SpeciesName>{allele.species.name}</SpeciesName></AttributeValue>

      <AttributeLabel>Symbol</AttributeLabel>
      <AttributeValue><AlleleSymbol allele={allele} /></AttributeValue>

      <AttributeLabel>Category</AttributeLabel>
      <AttributeValue>{allele.category}</AttributeValue>

      <AttributeLabel>Allele of gene</AttributeLabel>
      <AttributeValue placeholder='None'>
        {allele.gene && <Link to={`/gene/${allele.gene.id}`}><GeneSymbol gene={allele.gene} /></Link>}
      </AttributeValue>

      <AttributeLabel>Transgenic Constructs</AttributeLabel>
      <AttributeValue placeholder='None'>
        {allele.constructs && allele.constructs.length && (
          <CommaSeparatedList>
            {allele.constructs.map(construct => (
              <DataSourceLink key={construct.id} reference={construct.crossReferenceMap?.primary}>
                <span dangerouslySetInnerHTML={{__html: construct.name}} />
              </DataSourceLink>
            ))}
          </CommaSeparatedList>
        )}
      </AttributeValue>

      <AttributeLabel>Synonyms</AttributeLabel>
      <AttributeValue placeholder='None'>
        {allele.synonyms && allele.synonyms.length && <SynonymList synonyms={allele.synonyms} />}
      </AttributeValue>

      <AttributeLabel>Description</AttributeLabel>
      <AttributeValue>{allele.description && <span dangerouslySetInnerHTML={{__html: allele.description}} />}</AttributeValue>

      <AttributeLabel>Additional Information</AttributeLabel>
      <AttributeValue>
        {allele.crossReferenceMap.references &&
          <DataSourceLink reference={allele.crossReferenceMap.references}>Literature</DataSourceLink>
        }
      </AttributeValue>
    </AttributeList>
  );
};

AlleleSummary.propTypes = {
  allele: PropTypes.object,
};

export default AlleleSummary;
