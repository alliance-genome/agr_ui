import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NAV_MENU } from '../../../constants';

import { NavItem } from '.';
import style from './style.scss';

class MenuItems extends Component {
  render () {
    return (
      <nav className={`navbar navbar-expand-md ${style.topnav}`}>
        <div className='container-fluid'>
          <div className={`collapse navbar-collapse ${style.inner}`} id='exCollapsingNavbar2'>
            <ul className='navbar-nav'>
              {NAV_MENU.map(page => <NavItem currentRoute={this.props.currentRoute} key={page.label} page={page} />)}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

MenuItems.propTypes = {
  currentRoute: PropTypes.string,
};

export default MenuItems;
