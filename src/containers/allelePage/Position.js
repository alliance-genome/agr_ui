import React from 'react';
import PropTypes from 'prop-types';

const Position = ({start, end}) => (
  <span>
    {start}
    {end && end !== start ? ` - ${end}` : null}
  </span>
);

Position.propTypes = {
  start: PropTypes.string,
  end: PropTypes.string,
};
