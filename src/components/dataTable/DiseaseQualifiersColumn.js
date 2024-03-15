import React from 'react';
import PropTypes from 'prop-types';
import CommaSeparatedList from '../commaSeparatedList';

const DiseaseQualifiersColumn = ({qualifiers}) => {

  if (!qualifiers || !qualifiers.length) {
    return null;
  }
  
  return (
    <CommaSeparatedList>
      {qualifiers.map(qualifier => qualifier.replaceAll("_", " "))}
    </CommaSeparatedList>
  );
};

DiseaseQualifiersColumn.propTypes = {
  qualifiers: PropTypes.arrayOf(PropTypes.string),
};

export default DiseaseQualifiersColumn;
