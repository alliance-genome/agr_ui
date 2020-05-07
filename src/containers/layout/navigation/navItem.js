import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const NavItem = ({currentRoute, page}) => {
  const isParent = typeof page.sub !== 'undefined';
  const isActive = page.route === currentRoute ? 'active' : '';
  const menuItem = isParent ?
    <a className='nav-link dropdown-toggle mr-3' data-toggle='dropdown' href='#' role='button'>{page.label}</a> :
    <Link className={`nav-link mr-3 ${isActive}`} to={page.route}>{page.label}</Link>;
  return (
    <li className={`nav-item ${isParent ? ' dropdown' : ''}`}>
      {menuItem}
      {page.sub && (
        <div className='dropdown-menu' key role='menu'>
          {
            page.sub.map(sub => (
              <Link
                className={'dropdown-item'}
                key={sub.route}
                to={sub.route}
              >
                {sub.label}
              </Link>
            ))
          }
        </div>
      )}
    </li>
  );
};

NavItem.propTypes = {
  currentRoute: PropTypes.string,
  page: PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
    sub: PropTypes.array,
  }),
};

export default NavItem;
