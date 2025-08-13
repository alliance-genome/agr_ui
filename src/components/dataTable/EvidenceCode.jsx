import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

const EvidenceCode = ({ code }) => {
  const tooltipRef = useRef(null);

  const popperModifiers = [
    {
      name: 'preventOverflow',
      options: {
        rootBoundary: 'viewport',
      },
    },
  ];

  if (code.displaySynonym) {
    return (
      <>
        <span className="d-inline-block" ref={tooltipRef}>
          {code.displaySynonym}
        </span>
        <UncontrolledTooltip
          target={tooltipRef}
          modifiers={popperModifiers}
          delay={{ show: 300, hide: 150 }}
          placement="right"
        >
          {code.name}
        </UncontrolledTooltip>
      </>
    );
  } else {
    return code.name;
  }
};

EvidenceCode.propTypes = {
  code: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    displaySynonym: PropTypes.string,
  }),
};

export default EvidenceCode;
