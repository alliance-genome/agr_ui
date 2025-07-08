import React from 'react';
import hash from 'object-hash';

const ExperimentalConditionCellCuration = ({ conditions }) => {
  return conditions ? (
    <dl>
      {conditions.map((condition) => {
        const { conditions } = condition;
        const summaries = conditions.map(({ conditionSummary }) => conditionSummary);
        const key = hash(condition);
        return (
          <React.Fragment key={key}>
            <dt>{condition.conditionRelationType.name.replace(/_/, ' ')}:</dt>
            <dd>
              {summaries.map((summary) => (
                <span key={summary} className="d-block">
                  {summary.replace(/:/, ': ')}
                </span>
              ))}
            </dd>
          </React.Fragment>
        );
      })}
    </dl>
  ) : null;
};

export default ExperimentalConditionCellCuration;
