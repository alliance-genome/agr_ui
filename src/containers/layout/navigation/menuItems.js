import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NAV_MENU } from '../../../constants';
import { NavItem } from '.';

class MenuItems extends Component {
  render () {
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-primary p-0'>
        <div className='collapse navbar-collapse' id='exCollapsingNavbar2'>
          <ul className='navbar-nav m-3 m-md-1'>
            {NAV_MENU.map(page => <NavItem currentRoute={this.props.currentRoute} key={page.label} page={page} />)}
          </ul>
        </div>
      </nav>
    );
  }
}

MenuItems.propTypes = {
  currentRoute: PropTypes.string,
};

export default MenuItems;
