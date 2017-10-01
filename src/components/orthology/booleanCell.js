import React from 'react';
import PropTypes from 'prop-types';

const BooleanCell = ({value, labelTrue, labelFalse}) => {
  const backgroundColor = value ? '#dff0d8' : 'transparent';
  return (
    <td
      style={{
        backgroundColor: backgroundColor,
      }}
    >
    {
      value ? (labelTrue || 'Yes') : (labelFalse || 'No')
    }
    </td>
  );
};

BooleanCell.propTypes = {
  labelFalse: PropTypes.string,
  labelTrue: PropTypes.string,
  value: PropTypes.bool,
};

export default BooleanCell;
