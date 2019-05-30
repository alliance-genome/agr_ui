import React from 'react';
import PropTypes from 'prop-types';

const BooleanCell = ({value, isTrueFunc, render}) => {
  const backgroundColor = isTrueFunc(value) ? '#dff0d8' : 'transparent';
  const rendered = render ? render(value) : value;
  return (
    <td
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {
        typeof value === 'boolean' ? value ? 'Yes' : 'No' : rendered
      }
    </td>
  );
};

BooleanCell.propTypes = {
  isTrueFunc: PropTypes.func.isRequired,
  value: PropTypes.any,
  render: PropTypes.func.isRequired,
};

export default BooleanCell;
