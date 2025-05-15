import React from 'react';
import PropTypes from 'prop-types';
import NoData from '../noData.jsx';

const AttributeValue = ({style, children, bsClassName, placeholder}) => {
  return (
    <dd
      className={bsClassName}
      style={style}
    >
      {children || <NoData>{placeholder}</NoData>}
    </dd>
  );
};

AttributeValue.defaultProps = {
  style: {},
  bsClassName: 'col-md-9',
  placeholder: 'Not Available',
};

AttributeValue.propTypes = {
  bsClassName: PropTypes.string,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  style: PropTypes.object,
};

export default AttributeValue;
