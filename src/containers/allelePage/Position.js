import React from 'react';
import PropTypes from 'prop-types';
import NoData from '../../components/noData';

const Position = ({
  start,
  end,
  placeholder = 'Not Available',
}) => start || end ? (
  <span>
    {start}
    {end && end !== start ? ` - ${end}` : null}
  </span>
) : <NoData>{placeholder}</NoData>;

Position.propTypes = {
  end: PropTypes.string,
  placeholder: PropTypes.element,
  start: PropTypes.string,
};

export default Position;
