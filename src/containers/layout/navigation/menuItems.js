import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import { NAV_MENU } from '../../../constants';
import MenuItem from './MenuItem';

class MenuItems extends Component {
  render () {
    const { currentRoute, menuOpen, onItemClick } = this.props;
    return (
      <nav className='navbar navbar-expand-md navbar-dark bg-primary p-0'>
        <Collapse isOpen={menuOpen} navbar>
          <ul className='navbar-nav m-3 m-md-1'>
            {NAV_MENU.map(page => (
              <MenuItem
                currentRoute={currentRoute}
                key={page.label}
                onClick={onItemClick}
                page={page}
              />
            ))}
          </ul>
        </Collapse>
      </nav>
    );
  }
}

MenuItems.propTypes = {
  currentRoute: PropTypes.string,
  menuOpen: PropTypes.bool,
  onItemClick: PropTypes.func,
};

export default MenuItems;
