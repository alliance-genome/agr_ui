import React, { Component, PropTypes } from 'react';

class AttributeValue extends Component {

  render() {
    const { style, children, bsClassName } = this.props;
    return (
      <dd
        className={bsClassName}
        style={style}
      >
        {children || <i className='text-muted'>Not Available</i>}
      </dd>
    );
  }
}

AttributeValue.defaultProps = {
  style: {},
  bsClassName: 'col-sm-9',
};

AttributeValue.propTypes = {
  bsClassName: PropTypes.string,
  children: PropTypes.element,  
  style: PropTypes.object,
};

export default AttributeValue;
