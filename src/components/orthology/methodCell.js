import React from 'react';
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

        let symbol, tipText;
        if (predictionMethodsMatchedSet.has(methodName)) {
          symbol = '\u2611';
          tipText = `Match by ${methodName}`;
        } else if (predictionMethodsNotMatchedSet.has(methodName)) {
          symbol = '\u2610';
          tipText = `No match by ${methodName}`;
        } else {
          symbol = '\u00a0';
          tipText = `Comparision not available on ${methodName}`;
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
  predictionMethodsMatched: React.PropTypes.arrayOf(React.PropTypes.string),
  predictionMethodsNotMatched: React.PropTypes.arrayOf(React.PropTypes.string)
};

export default MethodCell;
