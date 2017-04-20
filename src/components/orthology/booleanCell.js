import React, { PropTypes } from 'react';

const BooleanCell = ({value, isTrueFunc}) => {
  const backgroundColor = isTrueFunc(value) ? '#dff0d8' : 'transparent';
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
  isTrueFunc: PropTypes.func,
  value: PropTypes.string,
};

export default BooleanCell;
