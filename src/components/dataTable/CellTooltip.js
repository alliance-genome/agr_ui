import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';

function CellTooltip({tooltip, id, children}) {
  let tooltipText;
  let isTruncated;
  if (typeof tooltip === 'string') {
    tooltipText = tooltip.split(' ').slice(0, 50).join(' ');
    isTruncated = tooltipText !== tooltip;
  }

  return (
    <div>
      <span id={id}>{children}</span>
      <UncontrolledTooltip
        delay={{show: 300, hide: 150}}
        placement="right"
        target={id}
      >
        {
          /* super long tooltip interferes with mouseover event */
          tooltipText ? isTruncated ? `${tooltipText}...` : tooltipText : tooltip
        }
      </UncontrolledTooltip>
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
