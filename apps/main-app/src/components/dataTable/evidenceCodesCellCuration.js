import React from 'react';
import PropTypes from 'prop-types';
import CommaSeparatedList from '../commaSeparatedList';
import EvidenceCodeCuration from './EvidenceCodeCuration';

const EvidenceCodesCellCuration = ({evidenceCodes}) => {

  if (!evidenceCodes || !evidenceCodes.length) {
    return null;
  }

  const uniqueCodes = [];
  evidenceCodes.forEach(code => {
    if (!uniqueCodes.some(unique => unique.curie === code.curie)) {
      uniqueCodes.push(code);
    }
  });

  return (
    <CommaSeparatedList>
      {uniqueCodes.map(code => <EvidenceCodeCuration key={code.curie} code={code} />)}
    </CommaSeparatedList>
  );
};

EvidenceCodesCellCuration.propTypes = {
  evidenceCodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    displaySynonym: PropTypes.string,
  })),
};

export default EvidenceCodesCellCuration;
