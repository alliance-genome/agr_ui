import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AttributeValue extends Component {

  render() {
    const { style, children, bsClassName, placeholder } = this.props;
    return (
      <dd
        className={bsClassName}
        style={style}
      >
        {children || <i className='text-muted'>{placeholder}</i>}
      </dd>
    );
  }
}

AttributeValue.defaultProps = {
  style: {},
  bsClassName: 'col-sm-9',
  placeholder: 'Not Available',
};

AttributeValue.propTypes = {
  bsClassName: PropTypes.string,
  children: PropTypes.node,
  placeholder: PropTypes.string,
  style: PropTypes.object,
};

export default AttributeValue;
