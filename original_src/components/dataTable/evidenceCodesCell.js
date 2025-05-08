import React from 'react';
import PropTypes from 'prop-types';
import CommaSeparatedList from '../commaSeparatedList';
import EvidenceCode from './EvidenceCode';

const EvidenceCodesCell = ({evidenceCodes}) => {

  if (!evidenceCodes || !evidenceCodes.length) {
    return null;
  }

  const uniqueCodes = [];
  evidenceCodes.forEach(code => {
    if (!uniqueCodes.some(unique => unique.id === code.id)) {
      uniqueCodes.push(code);
    }
  });

  return (
    <CommaSeparatedList>
      {uniqueCodes.map(code => <EvidenceCode key={code.id} code={code} />)}
    </CommaSeparatedList>
  );
};

EvidenceCodesCell.propTypes = {
  evidenceCodes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    displaySynonym: PropTypes.string,
  })),
};

export default EvidenceCodesCell;
