import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './style.scss';

class NavItem extends Component {
  render() {
    const { currentRoute, page } = this.props;
    const isParent = typeof page.sub !== 'undefined';
    const isActive = route => route === currentRoute ? style.active : '';
    const menuItem = isParent ?
      <a className='nav-link dropdown-toggle' data-toggle='dropdown' href='#' role='button'>{page.label}</a> :
      <Link className={`nav-link ${isActive(page.route)} ${style.menuItem}`} to={page.route}>{page.label}</Link>;
    return (
      <li className={`nav-item ${isParent ? ' dropdown' : ''}`}>
        <div className='btn-group'>
          {menuItem}
          {page.sub && (
            <div className='dropdown-menu' key role='menu'>
              {
                page.sub.map(sub => (
                  <Link className={`dropdown-item sub-menu ${isActive(sub.route)}`}
                        key={sub.route}
                        to={sub.route}
                  >
                    {sub.label}
                  </Link>
                ))
              }
            </div>
          )}
        </div>
      </li>
    );
  }
}

NavItem.propTypes = {
  currentRoute: PropTypes.string,
  page: PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
    sub: PropTypes.array,
  }),
};

export default NavItem;
