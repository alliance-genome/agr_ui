import React from 'react';
import PropTypes from 'prop-types';

const Position = ({start, end}) => start || end ? (
  <span>
    {start}
    {end && end !== start ? ` - ${end}` : null}
  </span>
) : null;

Position.propTypes = {
  end: PropTypes.string,
  start: PropTypes.string,
};

export default Position;
