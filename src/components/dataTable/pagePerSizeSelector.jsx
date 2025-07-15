import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const PerPageSizeSelector = ({ currSizePerPage, onSizePerPageChange, options }) => (
  <UncontrolledButtonDropdown className="px-1">
    <DropdownToggle caret color="secondary" outline>
      {currSizePerPage}
    </DropdownToggle>
    <DropdownMenu>
      {options.map((option) => (
        <DropdownItem key={option.text} onClick={() => onSizePerPageChange(option.page)}>
          {option.text}
        </DropdownItem>
      ))}
    </DropdownMenu>
  </UncontrolledButtonDropdown>
);

PerPageSizeSelector.propTypes = {
  currSizePerPage: PropTypes.number,
  onSizePerPageChange: PropTypes.func,
  options: PropTypes.array,
};

export default PerPageSizeSelector;
