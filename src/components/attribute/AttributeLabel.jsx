import React from 'react';
import PropTypes from 'prop-types';

const AttributeLabel = ({ style = {}, children, bsClassName = 'col-md-3' }) => {
  // default to capitalize, but allow override
  // Labels such as cDNA, HGVS.p should not be capitalized.
  const styleWithTextTransform = { textTransform: 'capitalize', ...style };
  return (
    <dt className={bsClassName} style={styleWithTextTransform}>
      {children}
    </dt>
  );
};

AttributeLabel.propTypes = {
  bsClassName: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default AttributeLabel;
