import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NavItem extends Component {
  render() {
    let classNames = '';
    if (this.props.isActive) {
      classNames += ' active';
    }

    if (this.props.hasDropDown) {
      classNames += ' nav-link dropdown-toggle';
      return (<a aria-expanded='false' className={classNames} data-toggle='dropdown' href={this.props.href} key={this.props.uniqueKey} role='button'>{this.props.label}<span className='caret' /></a>);
    } else {
      if(this.props.isChild){
        classNames +=' dropdown-item sub-menu';
        return (<a className={classNames} href={this.props.href} key={this.props.uniqueKey}>{this.props.label}</a>);
      }
      else{
        classNames += ' nav-link';
        return (<a className={classNames} href={this.props.href} key={this.props.uniqueKey}>{this.props.label}</a>);
      }

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
