import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import { ALL_METHODS, methodCellStyle } from './constants';

const MethodCell = (props) => {
  const {
    predictionMethodsMatched,
    predictionMethodsNotMatched,
    rowKey
  } = props;

  const predictionMethodsMatchedSet = new Set(predictionMethodsMatched);
  const predictionMethodsNotMatchedSet = new Set(predictionMethodsNotMatched);

  return (
    <td>
      {
        Object.keys(ALL_METHODS).sort().map((method) => {
          const methodDisplayName = (ALL_METHODS[method] || {}).displayName || method;

          let symbol, tipText;
          if (predictionMethodsMatchedSet.has(method)) {
            symbol = '\u2611';
            tipText = `Match by ${methodDisplayName}`;
          } else if (predictionMethodsNotMatchedSet.has(method)) {
            symbol = '\u2610';
            tipText = `No match by ${methodDisplayName}`;
          } else {
            symbol = '\u00a0';
            tipText = `Comparision not available on ${methodDisplayName}`;
          }

          const id = `${rowKey}-${method}`.replace(/[\s:]/g, '-');
          return (
            <span key={method}>
              <span id={id} style={Object.assign({fontSize: 22}, methodCellStyle)}>
                {symbol}
              </span>
              <UncontrolledTooltip delay={{show: 300, hide: 150}} placement='top' target={id}>
                {tipText}
              </UncontrolledTooltip>
            </span>
          );
        })
      }
    </td>
  );
};

MethodCell.propTypes = {
  predictionMethodsMatched: PropTypes.arrayOf(PropTypes.string),
  predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.string),
  rowKey: PropTypes.string
};

export default MethodCell;
