import React, {Component} from 'react';
import {
  MENU,
  WP_PATH,
  WP_POST_PATH,
  NAV_MENU
} from '../../../constants/index';
const HOME_ROUTE = '/home';
import NavItem from './item';
/* eslint-disable */
class MenuItems extends Component {
  render() {
    let container = [];
    for (var item in MENU) {
      let page = MENU[item];
      let page_path = page === 'news' ? WP_POST_PATH : WP_PATH;
      let page_url = page_path + '/' + NAV_MENU[page].slug;
      if (page_url === HOME_ROUTE) page_url = '/';
      let page_label = NAV_MENU[page].label;

      if (NAV_MENU[page].sub != undefined) {
        let sub_container = [];
        let is_item_active = false;
        for (let subItem in NAV_MENU[page].sub) {
          let child_slug = NAV_MENU[page].sub[subItem].slug;
          let sub_page_url = page_path + '/' + child_slug;
          if (child_slug === this.props.currentRoute || page === this.props.currentRoute) {
            is_item_active = true;
          }
          sub_container.push(<NavItem href={sub_page_url} isActive={child_slug === this.props.currentRoute ? true : false} isChild={true} key={Math.random()} label={NAV_MENU[page].sub[subItem].label} parentNode={page} uniqueKey={Math.random()} />);
        }
        container.push(<li className='nav-item dropdown' key={Math.random()}>
            <NavItem aria-expanded='false' hasDropDown={NAV_MENU[page].sub != undefined ? true : false} href={page_url} isActive={is_item_active} isChild={false} label={page_label} parentNode={page} role='button' uniqueKey={Math.random()} />
            <div className='dropdown-menu' key role='menu'>
              {sub_container}
            </div>
          </li>);
      } else {
        if(page == 'news'){
          container.push(<li className='nav-item' key={Math.random()}>
              <NavItem href={page_url} isActive={'posts' === this.props.currentRoute ? true : false} isChild={false} label={page_label} parentNode={page} uniqueKey={Math.random()} />
            </li>);
        }
        else{
          container.push(<li className="nav-item" key={Math.random()}>
              <NavItem href={page_url} isActive={page === this.props.currentRoute ? true : false} isChild={false} label={page_label} parentNode={page} uniqueKey={Math.random()} />
            </li>);
        }
      }
    }
    return <div className="collapse navbar-toggleable-md" id="exCollapsingNavbar2">
        <ul className={"nav navbar-nav topnav"}>{container}</ul>
      </div>;
  }
}

export default MenuItems;
