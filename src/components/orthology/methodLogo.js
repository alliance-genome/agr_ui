import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ALL_METHODS, methodHeaderCellStyle } from './constants';

const MethodLogo = ({methodKey}) => {
  const methodName = ALL_METHODS[methodKey] ?
    ALL_METHODS[methodKey].name : methodKey;

  const tooltip = (
    <Tooltip
      className="in"
      id="tooltip-bottom"
      placement="bottom"
    >
    {
      methodName
    }
    </Tooltip>
  );

  return (
    <OverlayTrigger
      delayHide={150}
      delayShow={300}
      overlay={tooltip}
      placement="top"
    >
      <span style={methodHeaderCellStyle}>{methodName}</span>
    </OverlayTrigger>
  );
};

MethodLogo.propTypes = {
  methodKey: React.PropTypes.string
};

export default MethodLogo;
