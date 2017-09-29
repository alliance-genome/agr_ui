import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AttributeLabel extends Component {

  render() {
    const { style, children, bsClassName } = this.props;
    return (
      <dt
        className={bsClassName}
        style={style}
      >
        {children}
      </dt>
    );
  }
}

AttributeLabel.defaultProps = {
  style: {},
  bsClassName: 'col-sm-3',
};

AttributeLabel.propTypes = {
  bsClassName: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
};

export default AttributeLabel;
