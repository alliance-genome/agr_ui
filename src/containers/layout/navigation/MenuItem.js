import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
} from 'reactstrap';

import style from './style.scss';

const MenuItem = ({currentRoute, page, onClick}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(prevState => !prevState);
  const close = () => setIsOpen(false);
  const handleClick = () => {
    close();
    if (typeof onClick === 'function') {
      onClick();
    }
  };
  const isActive = route => route === currentRoute ? style.active : '';
  let item;
  if (typeof page.sub === 'undefined') {
    item = (
      <NavItem>
        <NavLink
          className={`${style.menuItem} ${isActive(page.route)}`}
          onClick={handleClick}
          tag={Link}
          to={page.route}
        >
          {page.label}
        </NavLink>
      </NavItem>
    );
  } else {
    item = (
      <Dropdown inNavbar isOpen={isOpen} nav toggle={toggle}>
        <DropdownToggle caret nav>
          {page.label}
        </DropdownToggle>
        <DropdownMenu>
          {
            page.sub.map(sub => (
              <Link
                className={`dropdown-item ${isActive(sub.route)}`}
                key={sub.route}
                onClick={handleClick}
                to={sub.route}
              >
                {sub.label}
              </Link>
            ))
          }
        </DropdownMenu>
      </Dropdown>
    );
  }

  return item;
};

MenuItem.propTypes = {
  currentRoute: PropTypes.string,
  onClick: PropTypes.func,
  page: PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
    sub: PropTypes.array,
  }),
};

export default MenuItem;
