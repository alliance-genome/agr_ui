import React from 'react';
import PropTypes from 'prop-types';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';

const HelpPopup = ({children, id}) => {
  return (
    <React.Fragment>
      <i
        className='fa fa-fw fa-question-circle text-primary'
        id={id}
        style={{cursor: 'pointer'}}
      />
      <UncontrolledPopover placement='top-start' target={id} trigger='legacy'>
        <PopoverBody>{children}</PopoverBody>
      </UncontrolledPopover>
    </React.Fragment>
  );
};

HelpPopup.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired
};

export default HelpPopup;
