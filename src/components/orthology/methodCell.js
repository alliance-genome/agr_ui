import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ALL_METHODS, methodCellStyle } from './constants';

const MethodCell = ({methods}) => {
  const calledSet = new Set(
    (methods || [])
      .filter((method) => method.isCalled)
      .map((method) => method.id)
  );
  const notCalledSet = new Set(
    (methods || [])
      .filter((method) => !method.isCalled)
      .map((method) => method.id)
  );

  return (
    <td>
    {
      Object.keys(ALL_METHODS).map((method) => {

        const methodName = ALL_METHODS[method].name;

        let symbol, tipText;
        if (calledSet.has(method)) {
          symbol = '\u2611';
          tipText = `Call made by ${methodName}`;
        } else if (notCalledSet.has(method)) {
          symbol = '\u2610';
          tipText = `No call made by ${methodName}`;
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
  methods: React.PropTypes.arrayOf(React.PropTypes.string),
};

export default MethodCell;
