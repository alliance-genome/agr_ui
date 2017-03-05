import React from 'react';
import MethodLogo from './methodLogo';
import { ALL_METHODS, methodCellWidth } from './constants';

const MethodHeader = ({name}) => (<th>
  <div>{name}</div>
  <div style={{minWidth: methodCellWidth * Object.keys(ALL_METHODS).length}}>{
    Object.keys(ALL_METHODS).sort().map((methodKey) => (
      <MethodLogo key={methodKey} methodKey={methodKey} />
    ))
  }</div>
</th>);

MethodHeader.propTypes = {
  name: React.PropTypes.string
};

export default MethodHeader;
