import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

const HelpIcon = ({iconKey, text}) => {
  const id = iconKey.replace(/\s/g, '-');
  return (
    <span>
      <i className='fa fa-fw fa-question-circle text-primary' id={id} />
      <UncontrolledTooltip placement='bottom' target={id}>
        {text}
      </UncontrolledTooltip>
    </span>
  );
};

HelpIcon.propTypes = {
  iconKey: PropTypes.string,
  text: PropTypes.string,
};

export default HelpIcon;
