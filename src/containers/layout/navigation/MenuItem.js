import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownToggle,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from 'reactstrap';

import style from './style.scss';

class MenuItem extends Component {
  render() {
    const { currentRoute, page } = this.props;
    const isActive = route => route === currentRoute ? style.active : '';
    let item;
    if (typeof page.sub === 'undefined') {
      item = (
        <NavItem>
          <NavLink className={`${style.menuItem} ${isActive(page.route)}`} tag={Link} to={page.route}>
            {page.label}
          </NavLink>
        </NavItem>
      );
    } else {
      item = (
        <UncontrolledDropdown inNavbar nav>
          <DropdownToggle caret nav>
            {page.label}
          </DropdownToggle>
          <DropdownMenu>
            {
              page.sub.map(sub => (
                <Link
                  className={`dropdown-item ${isActive(sub.route)}`}
                  key={sub.route}
                  to={sub.route}
                >
                  {sub.label}
                </Link>
              ))
            }
          </DropdownMenu>
        </UncontrolledDropdown>
      );
    }

    return item;
  }
}

MenuItem.propTypes = {
  currentRoute: PropTypes.string,
  page: PropTypes.shape({
    label: PropTypes.string,
    route: PropTypes.string,
    sub: PropTypes.array,
  }),
};

export default MenuItem;
