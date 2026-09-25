import React, { useState } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import { makeFieldDisplayName } from '../../lib/searchHelpers.jsx';
import ExplainNode from './explainNode.jsx';

const ResultExplanation = ({ explanation, score }) => {
  const [isHidden, setIsHidden] = useState(true);

  if (!explanation || explanation === '') return null;

  return (
    <div>
      <div className={style.detailContainer}>
        <div className={style.detailLineContainer}>
          <span className={style.detailLabel}>
            <strong>{makeFieldDisplayName('score')}:</strong>{' '}
          </span>
          <span className={style.detailValue}>{score}</span>
          <button
            className={`btn btn-outline-primary btn-sm ${style.explanationButton}`}
            onClick={() => setIsHidden((prev) => !prev)}
          >
            scoring details
          </button>
        </div>
      </div>
      <div className={style.resultExplanation}>{!isHidden && <ExplainNode explanation={explanation} />}</div>
    </div>
  );
};

ResultExplanation.propTypes = {
  explanation: PropTypes.object,
  score: PropTypes.object,
};

export default ResultExplanation;
