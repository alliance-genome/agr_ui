import React from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import { ALL_METHODS, methodCellStyle } from './constants';

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

  const hasIcon = ALL_METHODS[methodKey] && ALL_METHODS[methodKey].icon;
  return (
    <OverlayTrigger
      delayHide={150}
      delayShow={300}
      overlay={tooltip}
      placement="top"
    >
      <span style={methodCellStyle}>
      {
        hasIcon ?
          <img
            alt={methodName}
            height={16}
            src={ALL_METHODS[methodKey].icon}
            width={16}
          /> :
          methodName.substring(0, 1)
      }
      </span>
    </OverlayTrigger>
  );
};

MethodLogo.propTypes = {
  methodKey: React.PropTypes.string
};

export default MethodLogo;
