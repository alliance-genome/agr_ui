import React from 'react';
import PropTypes from 'prop-types';
const ExperimentalConditionCell = ({conditions}) => {
  return conditions && Object.keys(conditions).map(key => {
    const statements = conditions[key].map(({conditionStatement}) => conditionStatement).join(', ');
    return (
      <div key={key}>
        <strong>{key.replace(/_/, ' ')}:</strong>
        <div>{statements.replace(/:/, ': ')}</div>
      </div>
    );
  });
};

ExperimentalConditionCell.protoType = {
  conditions: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        conditionStatement: PropTypes.string
      })
    ).isRequired,
  ).isRequired,
};

export default ExperimentalConditionCell;