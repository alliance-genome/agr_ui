/**
 * Navigation menu item object
 * author: fgondwe@stanford.edu
 * date: 01/30/18
 */
/* eslint-disable  */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NavItem extends Component {
  

  render() {
    let classNames = "nav-link";
    if (this.props.isActive) {
      classNames += " active";
    }

    if (this.props.hasDropDown) {
      classNames += " dropdown-toggle";
      return (
        <a
          aria-expanded="false"
          className={classNames}
          data-toggle="dropdown"
          href={this.props.href}
          key={this.props.uniqueKey}
          role="button"
          onClick={this.handleNavClick(this)}
        >
          {this.props.label}
          <span className="caret" />
        </a>
      );
    } else {
      return <a className={classNames} href={this.props.href} key={this.props.uniqueKey} onClick={this.handleNavClick(this)}>
          {this.props.label}
        </a>;
    }
  }
}
NavItem.propTypes = {
  hasDropDown: PropTypes.bool,
  href: PropTypes.string,
  isActive: PropTypes.bool,
  isChild:PropTypes.bool,
  label: PropTypes.string,
  parentNode: PropTypes.string,
  uniqueKey: PropTypes.number
};

export default NavItem;
