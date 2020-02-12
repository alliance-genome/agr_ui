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

const AlleleSummary = ({allele}) => {
  return (
    <AttributeList>
      <AttributeLabel>Species</AttributeLabel>
      <AttributeValue><i>{allele.species.name}</i></AttributeValue>

      <AttributeLabel>Symbol</AttributeLabel>
      <AttributeValue><AlleleSymbol allele={allele} /></AttributeValue>

      <AttributeLabel>Allele of gene</AttributeLabel>
      <AttributeValue><Link to={`/gene/${allele.gene.id}`}>{allele.gene.symbol}</Link></AttributeValue>

      <AttributeLabel>Synonyms</AttributeLabel>
      <AttributeValue placeholder='None'>
        {allele.synonyms && allele.synonyms.length && <SynonymList synonyms={allele.synonyms} />}
      </AttributeValue>

      <AttributeLabel>Description</AttributeLabel>
      <AttributeValue />

      <AttributeLabel>Additional Information</AttributeLabel>
      <AttributeValue />
    </AttributeList>
  );
};

AlleleSummary.propTypes = {
  allele: PropTypes.object,
};

export default AlleleSummary;
