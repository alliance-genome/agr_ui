import React from 'react';
import PropTypes from 'prop-types';
import CommaSeparatedList from '../commaSeparatedList';
import EvidenceCodeCuration from './EvidenceCodeCuration';

const DiseaseQualifiersColumn = ({qualifiers}) => {

  if (!qualifiers || !qualifiers.length) {
    return null;
  }

  return (
    <CommaSeparatedList>
      {qualifiers.map(qualifier => qualifier)}
    </CommaSeparatedList>
  );
};

DiseaseQualifiersColumn.propTypes = {
  qualifiers: PropTypes.arrayOf(PropTypes.string),
};

export default DiseaseQualifiersColumn;
