import React from 'react';

const ExperimentalConditionCellCuration = ({ conditions }) => {
  return conditions? (
    <dl>
      {
        conditions.map(condition=> {
            const { conditions, id } = condition;
          const summaries = conditions.map(({conditionSummary}) => conditionSummary);
          return (
            <React.Fragment key={id}>
              <dt>{condition.conditionRelationType.name.replace(/_/, ' ')}:</dt>
              <dd>
                {summaries.map(summary => (
                  <span key={summary} className="d-block">{summary.replace(/:/, ': ')}</span>
                ))}
              </dd>
            </React.Fragment>
          );
        })
      }
    </dl>
  ) : null;
};

export default ExperimentalConditionCellCuration;