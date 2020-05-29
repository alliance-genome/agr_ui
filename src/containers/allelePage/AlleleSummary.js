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

const AlleleSummary = ({allele}) => {
  return (
    <AttributeList>
      <AttributeLabel>Species</AttributeLabel>
      <AttributeValue><i>{allele.species.name}</i></AttributeValue>

      <AttributeLabel>Symbol</AttributeLabel>
      <AttributeValue><AlleleSymbol allele={allele} /></AttributeValue>

      <AttributeLabel>Allele of gene</AttributeLabel>
      <AttributeValue placeholder='None'>
        {allele.gene && <Link to={`/gene/${allele.gene.id}`}>{allele.gene.symbol}</Link>}
      </AttributeValue>

      <AttributeLabel>Transgenic Constructs</AttributeLabel>
      <AttributeValue placeholder='None'>
        {allele.constructs && allele.constructs.length && (
          <CommaSeparatedList>
            {allele.constructs.map(construct => (
              <DataSourceLink key={construct.id} reference={construct.crossReferences.primary}>
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
        {allele.crossReferences.references &&
          <DataSourceLink reference={allele.crossReferences.references}>Literature</DataSourceLink>
        }
      </AttributeValue>
    </AttributeList>
  );
};

AlleleSummary.propTypes = {
  allele: PropTypes.object,
};

export default AlleleSummary;
