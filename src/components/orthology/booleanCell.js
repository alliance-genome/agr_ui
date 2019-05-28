import React from 'react';
import PropTypes from 'prop-types';

const BooleanCell = ({value, isTrueFunc}) => {
  const backgroundColor = isTrueFunc(value) ? '#dff0d8' : 'transparent';
  return (
    <td
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {
        typeof value === 'boolean' ? value ? 'Yes' : 'No' : value
      }
    </td>
  );
};

BooleanCell.propTypes = {
  isTrueFunc: PropTypes.func.isRequired,
  value: PropTypes.any,
};

export default BooleanCell;
