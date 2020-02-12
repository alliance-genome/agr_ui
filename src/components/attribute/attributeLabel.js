import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AttributeLabel extends Component {

  render() {
    const { style, children, bsClassName } = this.props;
    const styleWithTextTransform={...style, ...{textTransform: 'capitalize'}};

    return (
      <dt
        className={bsClassName}
        style={styleWithTextTransform}
      >
        {children}
      </dt>
    );
  }
}

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
