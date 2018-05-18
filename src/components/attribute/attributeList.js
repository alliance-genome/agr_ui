import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AttributeList extends Component {

  render() {
    const { children } = this.props;

    return (
      <dl className='row no-gutters'>
        {
          children
        }
      </dl>
    );
  }
}

AttributeList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

export default AttributeList;
