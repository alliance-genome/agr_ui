import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

const EvidenceCodeCuration = ({code}) => {
  const tooltipRef = useRef(null);

  if (code.abbreviation) {
    return (
      <React.Fragment>
        <span className="d-inline-block" ref={tooltipRef}>{code.abbreviation}</span>
        <UncontrolledTooltip
          target={tooltipRef}
          delay={{show: 300, hide: 150}}
          placement='right'
          modifiers={{
            preventOverflow: {
              enabled: false
            }
          }}
        >
          {code.name}
        </UncontrolledTooltip>
      </React.Fragment>
    );
  } else {
    return code.name;
  }
};

EvidenceCodeCuration.PropTypes = {
  code: PropTypes.shape({
    curie: PropTypes.string,
    name: PropTypes.string,
    abbreviation: PropTypes.string,
  }),
};

export default EvidenceCodeCuration;
