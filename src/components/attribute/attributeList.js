import React, { Component, PropTypes } from 'react';

class AttributeList extends Component {

  render() {
    const { children, bsClassName } = this.props;

    return (
      <div className="row">
        <div className={bsClassName}>
          <dl className="row">
            {
              children
            }
          </dl>
        </div>
      </div>
    );
  }
}

AttributeList.defaultProps = {
  bsClassName: 'col-sm-8',
};

AttributeList.propTypes = {
  bsClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(React.PropTypes.node),
    PropTypes.node
  ]),
};

export default AttributeList;
