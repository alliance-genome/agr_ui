import React from 'react';
import PropTypes from 'prop-types';
const ExperimentalConditionCell = ({ conditions }) => {
  return conditions ? (
    <dl>
      {Object.keys(conditions).map((key) => {
        const statements = conditions[key].map(({ conditionStatement }) => conditionStatement);
        return (
          <React.Fragment key={key}>
            <dt>{key.replace(/_/, ' ')}:</dt>
            <dd>
              {statements.map((statement) => (
                <span key={statement} className="d-block">
                  {statement.replace(/:/, ': ')}
                </span>
              ))}
            </dd>
          </React.Fragment>
        );
      })}
    </dl>
  ) : null;
};

ExperimentalConditionCell.propTypes = {
  conditions: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        conditionStatement: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired
  ),
};

export default ExperimentalConditionCell;
