import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'reactstrap';

import { NAV_MENU } from '../../../constants';

import { MenuItem } from '.';
import style from './style.scss';

class MenuItems extends Component {
  render () {
    const { currentRoute, menuOpen, onItemClick } = this.props;
    return (
      <nav className={`navbar navbar-expand-md ${style.topnav}`}>
        <div className='container-fluid'>
          <Collapse className={style.inner} isOpen={menuOpen} navbar>
            <ul className='navbar-nav'>
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
        </div>
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
