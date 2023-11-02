import React from 'react';
import PropTypes from 'prop-types';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';
import { makeId } from '../lib/utils';

const HelpPopup = ({children, id, placement='top-start', ...otherProps}) => {
  id = makeId(id);
  const popperModifiers = {
    preventOverflow: {
      boundariesElement: 'window',
    }
  };
  return (
    <React.Fragment>
      <i
        className='fa fa-question-circle text-primary'
        id={id}
        style={{cursor: 'pointer'}}
      />
      <UncontrolledPopover {...otherProps} modifiers={popperModifiers} placement={placement} target={id} trigger='legacy'>
        <PopoverBody>{children}</PopoverBody>
      </UncontrolledPopover>
    </React.Fragment>
  );
};

HelpPopup.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  placement: PropTypes.string,
};

export default HelpPopup;
