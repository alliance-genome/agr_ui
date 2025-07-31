import React, { Fragment } from 'react';
import hash from 'object-hash';

const ExperimentalConditionCellCuration = ({ conditions }) => {
  return conditions ? (
    <dl>
      {conditions.map((condition) => {
        const { conditions } = condition;
        const summaries = conditions.map(({ conditionSummary }) => conditionSummary);
        const key = hash(condition);
        return (
          <Fragment key={key}>
            <dt>{condition.conditionRelationType.name.replace(/_/, ' ')}:</dt>
            <dd>
              {summaries.map((summary) => (
                <span key={summary} className="d-block">
                  {summary.replace(/:/, ': ')}
                </span>
              ))}
            </dd>
          </Fragment>
        );
      })}
    </dl>
  ) : null;
};

export default ExperimentalConditionCellCuration;
