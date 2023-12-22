/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';


class CollapsibleFacet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false
    };
  }

  handleToggle(e) {
    if (e) {
      e.preventDefault();
    }
    this.setState({ isCollapsed: !this.state.isCollapsed });
  }

  renderActiveNode() {
    return this.props.children;
  }

  renderInactiveNode() {
    return null;
  }

  render() {
    let actionText = !this.state.isCollapsed ? this.props.label : 'Hide';
    return (
      <div className='row'>
        <div className={`col-md-12 ${style.mobileToolbar}`}>
          <a
            className={`${style.textAction} font-weight-bold`}
            onClick={() => this.handleToggle()}
          >
            {actionText}
            {actionText === 'Hide' ? '' :
              <i className={`fa fa-angle-down ${style.filterCaret}`} />}
          </a>
          {this.state.isCollapsed ? this.renderActiveNode() : this.renderInactiveNode()}
        </div>
      </div>
    );
  }

}

CollapsibleFacet.propTypes = {
  children: PropTypes.element.isRequired,
  label: PropTypes.string
};

CollapsibleFacet.defaultProps = {
  label: 'Expand'
};

export default CollapsibleFacet;
