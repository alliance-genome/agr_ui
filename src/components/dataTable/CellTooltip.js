import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

function CellTooltip({tooltip, id, children}) {

  return (
    <div>
      <span id={id}>{children}</span>
      <UncontrolledTooltip
        delay={{show: 300, hide: 150}}
        placement="top"
        target={id}
      >{tooltip}</UncontrolledTooltip>
    </div>
  );
}

CellTooltip.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

export default CellTooltip;
