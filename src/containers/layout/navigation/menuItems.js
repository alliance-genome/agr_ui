import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  MENU,
  WORDPRESS_PATH,
  WORDPRESS_POST_PATH,
  NAV_MENU,
} from '../../../constants';

const HOME_ROUTE = '/home';
import NavItem from './item';

class MenuItems extends Component {
  render () {
    let container = [];
    for (var item in MENU) {
      let page = MENU[item];
      let page_path = page === 'news' ? WORDPRESS_POST_PATH : WORDPRESS_PATH;
      let page_url = page_path + '/' + NAV_MENU[page].slug;
      if (page_url === HOME_ROUTE) page_url = '/';
      let page_label = NAV_MENU[page].label;
      const item_key = NAV_MENU[page].id;

      if (NAV_MENU[page].sub !== undefined) {
        let sub_container = [];
        let is_item_active = false;
        for (let subItem in NAV_MENU[page].sub) {
          const sub_key = NAV_MENU[page].sub[subItem].id;
          let child_slug = NAV_MENU[page].sub[subItem].slug;
          let sub_page_url = page_path + '/' + child_slug;
          if (child_slug === this.props.currentRoute || page === this.props.currentRoute) {
            is_item_active = true;
          }
          sub_container.push(
            <NavItem href={sub_page_url}
                     isActive={child_slug === this.props.currentRoute} isChild
                     key={sub_key} label={NAV_MENU[page].sub[subItem].label} parentNode={page}
                     uniqueKey={sub_key}
            />);
        }
        container.push(<li className='nav-item dropdown' key={item_key}>
          <NavItem aria-expanded='false' hasDropDown={NAV_MENU[page].sub !== undefined} href={page_url}
                   isActive={is_item_active} isChild={false} label={page_label} parentNode={page} role='button'
                   uniqueKey={item_key}
          />
          <div className='dropdown-menu' key role='menu'>
            {sub_container}
          </div>
        </li>);
      } else {
        if (page === 'news') {
          container.push(<li className='nav-item' key={item_key}>
            <NavItem href={page_url} isActive={'posts' === this.props.currentRoute} isChild={false}
                     label={page_label} parentNode={page} uniqueKey={item_key}
            />
          </li>);
        }
        else {
          container.push(<li className="nav-item" key={item_key}>
            <NavItem href={page_url} isActive={page === this.props.currentRoute} isChild={false}
                     label={page_label} parentNode={page} uniqueKey={item_key}
            />
          </li>);
        }
      }
    }
    return (
      <div className="collapse navbar-toggleable-md" id="exCollapsingNavbar2">
        <ul className={'nav navbar-nav topnav'}>{container}</ul>
      </div>
    );
  }
}

MenuItems.propTypes = {
  currentRoute: PropTypes.string,
};

export default MenuItems;
