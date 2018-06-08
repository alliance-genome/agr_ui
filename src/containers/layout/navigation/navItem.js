import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import style from './style.scss';

class NavItem extends Component {
  render() {
    const { currentRoute, page } = this.props;
    const isParent = typeof page.sub !== 'undefined';
    const isActive = route => route === currentRoute ? style.active : '';
    return (
      <li className={`nav-item ${isParent && ' dropdown'}`}>
        <div className='btn-group'>
          <Link className={`nav-link ${isActive(page.route)} ${isParent && ' dropdown-toggle'}`}
                data-toggle={isParent && 'dropdown'}
                to={page.route}
          >
            {page.label}
          </Link>
          {page.sub && (
            <div className='dropdown-menu' key role='menu'>
              <Link className={`dropdown-item sub-menu ${isActive(page.route)}`} to={page.route}>
                {page.label}
              </Link>
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
