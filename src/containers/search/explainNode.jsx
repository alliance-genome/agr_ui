import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';

const ExplainNode = ({ explanation }) => {
  if (!explanation) {
    return null;
  }

  return (
    <ul className={style.explanationList}>
      <li>
        {' '}
        <strong>{explanation.value}</strong>: {explanation.match || ''}
        {explanation.description}
      </li>
      <li>
        {explanation.details.map((detail, i) => (
          <ExplainNode explanation={detail} key={i} />
        ))}
      </li>
    </ul>
  );
};

ExplainNode.propTypes = {
  explanation: PropTypes.object,
};

export default ExplainNode;
