import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const HelpIcon = ({iconKey, text}) => {
  const tooltip = (
    <Tooltip id={iconKey}>{text}</Tooltip>
  );
  return (
    <OverlayTrigger overlay={tooltip} placement='bottom'>
      <i className='fa fa-fw fa-question-circle text-primary' />
    </OverlayTrigger>
  );
};

HelpIcon.propTypes = {
  iconKey: PropTypes.string,
  text: PropTypes.string,
};

export default HelpIcon;
