import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import UncontrolledTooltip from 'reactstrap/lib/UncontrolledTooltip';

const EvidenceCode = ({code}) => {
  const tooltipRef = useRef(null);

  if (code.displaySynonym) {
    return (
      <React.Fragment>
        <span className="d-inline-block" ref={tooltipRef}>{code.displaySynonym}</span>
        <UncontrolledTooltip
          target={tooltipRef}
          modifiers={{
            preventOverflow: {
              enabled: false
            }
          }}
          delay={{show: 300, hide: 150}}
          placement='right'
        >
          {code.name}
        </UncontrolledTooltip>
      </React.Fragment>
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
