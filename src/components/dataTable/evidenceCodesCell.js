import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import CommaSeparatedList from '../commaSeparatedList';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

const EvidenceCodesCell = ({evidenceCodes}) => {
  const tooltipRef = useRef(null);

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
      {uniqueCodes.map(code => {
        if (code.displaySynonym) {
          return (
            <>
              <span ref={tooltipRef}>{code.displaySynonym}</span>
              <UncontrolledTooltip target={tooltipRef} delay={{show: 300, hide: 150}} placement='top'>
                {code.name}
              </UncontrolledTooltip>
            </>
          );
        } else {
          return code.name;
        }
      })}
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
