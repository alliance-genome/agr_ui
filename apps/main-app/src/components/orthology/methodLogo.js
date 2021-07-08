import React from 'react';
import PropTypes from 'prop-types';
import { UncontrolledTooltip } from 'reactstrap';
import { ALL_METHODS, methodHeaderCellStyle } from './constants';

const MethodLogo = ({methodKey}) => {
  const methodName = (ALL_METHODS[methodKey] || {}).displayName || methodKey;
  const id = 'methodLogo-' + methodKey.replace(/\s/g, '-');
  return (
    <span>
      <span id={id} style={methodHeaderCellStyle}>{methodName}</span>
      <UncontrolledTooltip delay={{hide: 150, show: 300}} placement='top' target={id}>
        {methodName}
      </UncontrolledTooltip>
    </span>
  );
};

MethodLogo.propTypes = {
  methodKey: PropTypes.string
};

export default MethodLogo;
