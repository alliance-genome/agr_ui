import React, { PropTypes } from 'react';

const BooleanCell = ({value, isTrue}) => {
  const backgroundColor = isTrue(value) ? '#dff0d8' : 'transparent';
  return (
    <td
      style={{
        backgroundColor: backgroundColor,
      }}
    >
    {
      value
    }
    </td>
  );
};

BooleanCell.propTypes = {
  isTrue: PropTypes.func,
  value: PropTypes.string,
};

export default BooleanCell;
