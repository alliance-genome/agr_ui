import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ALL_METHODS, methodCellStyle } from './constants';

const MethodCell = (props) => {
  const {
    predictionMethodsMatched,
    predictionMethodsNotMatched
  } = props;

  const predictionMethodsMatchedSet = new Set(predictionMethodsMatched);
  const predictionMethodsNotMatchedSet = new Set(predictionMethodsNotMatched);

  return (
    <td>
    {
      Object.keys(ALL_METHODS).sort().map((method) => {

        const methodName = ALL_METHODS[method].name;
        const methodDisplayName = ALL_METHODS[method].displayName || methodName;

        let symbol, tipText;
        if (predictionMethodsMatchedSet.has(methodName)) {
          symbol = '\u2611';
          tipText = `Match by ${methodDisplayName}`;
        } else if (predictionMethodsNotMatchedSet.has(methodName)) {
          symbol = '\u2610';
          tipText = `No match by ${methodDisplayName}`;
        } else {
          symbol = '\u00a0';
          tipText = `Comparision not available on ${methodDisplayName}`;
        }

        const tooltip = (
          <Tooltip
            className="in"
            id="tooltip-bottom"
            placement="bottom"
          >
          {
            tipText
          }
          </Tooltip>
        );

        return (
          <OverlayTrigger
            delayHide={150}
            delayShow={300}
            key={method}
            overlay={tooltip}
            placement="top"
          >
            <span style={Object.assign({fontSize: 22}, methodCellStyle)}>
            {
              symbol
            }
            </span>
          </OverlayTrigger>
        );
      })
    }
    </td>
  );
};

MethodCell.propTypes = {
  predictionMethodsMatched: PropTypes.arrayOf(PropTypes.string),
  predictionMethodsNotMatched: PropTypes.arrayOf(PropTypes.string)
};

export default MethodCell;
