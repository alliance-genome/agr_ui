import React, { Component, PropTypes } from 'react';

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
  children: PropTypes.element,
  style: PropTypes.object,
};

export default AttributeLabel;
