import React from 'react';
import PropTypes from 'prop-types';

const AttributeLabel = ({style, children, bsClassName}) => {
  const styleWithTextTransform = {...style, ...{textTransform: 'capitalize'}};
  return (
    <dt
      className={bsClassName}
      style={styleWithTextTransform}
    >
      {children}
    </dt>
  );
};

AttributeLabel.defaultProps = {
  style: {},
  bsClassName: 'col-md-3',
};

AttributeLabel.propTypes = {
  bsClassName: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default AttributeLabel;
