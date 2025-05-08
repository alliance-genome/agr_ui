import React from 'react';
import PropTypes from 'prop-types';

const AttributeList = ({children, className}) => {
  return (
    <dl className={`row no-gutters ${className}`}>
      {children}
    </dl>
  );
};

AttributeList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
};

export default AttributeList;
