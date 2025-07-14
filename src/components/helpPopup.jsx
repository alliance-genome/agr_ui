import React from 'react';
import PropTypes from 'prop-types';
import { PopoverBody, UncontrolledPopover } from 'reactstrap';
import { makeId } from '../lib/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const HelpPopup = ({ children, id, placement = 'top-start', ...otherProps }) => {
  id = makeId(id);
  // const popperModifiers = {
  //   preventOverflow: {
  //     boundariesElement: 'window',
  //   }
  // };
  const popperModifiers = [
    {
      name: 'preventOverflow',
      options: {
        rootBoundary: 'viewport',
      },
    },
  ];
  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faCircleQuestion} id={id} style={{ cursor: 'pointer' }} className="text-primary" />
      <UncontrolledPopover
        {...otherProps}
        modifiers={popperModifiers}
        placement={placement}
        target={id}
        trigger="legacy"
      >
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
