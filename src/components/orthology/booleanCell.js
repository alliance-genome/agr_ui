import React from 'react';

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
  labelFalse: React.PropTypes.string,
  labelTrue: React.PropTypes.string,
  value: React.PropTypes.bool,
};

export default BooleanCell;
