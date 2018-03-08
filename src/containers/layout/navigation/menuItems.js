/**
 * Navigation menu items: Home, About Us etc.
 * author: fgondwe@stanford.edu
 * date: 12/14/17
 */
/* eslint-disable  */
import React, {Component} from 'react';
import style from '../style.css';
import logo from './log-test.png';
import Proptypes from 'prop-types';
import SubMenu from '../subMenu';
import {
  MENU,
  WP_PAGES,
  WP_PATH,
  WP_POST_PATH,
  SUB_MENU,
  NAV_MENU
} from '../../../constants/index';
const HOME_ROUTE = '/home';
import NavItem from './item';

class MenuItems extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let container = [];
    let tabActive = "";
    for (var item in MENU) {
      let page = MENU[item];
      let page_path = page === "news" ? WP_POST_PATH : WP_PATH;
      let page_url = page_path + "/" + NAV_MENU[page].slug;
      if (page_url === HOME_ROUTE) page_url = "/";
      let page_label = NAV_MENU[page].label;

      if (NAV_MENU[page].sub != undefined) {
        let sub_container = [];
        let is_item_active = false;
        for (let subItem in NAV_MENU[page].sub) {
          let child_slug = NAV_MENU[page].sub[subItem].slug;
          let sub_page_url = page_path + "/" + child_slug;
          if (child_slug === this.props.currentRoute || page === this.props.currentRoute) {
            is_item_active = true;
          }
          sub_container.push(<NavItem isActive={child_slug === this.props.currentRoute ? true : false} href={sub_page_url} uniqueKey={Math.random()} key={Math.random()} label={NAV_MENU[page].sub[subItem].label} isChild={true} parentNode={page} />);
        }
        container.push(<li className="nav-item dropdown" key={Math.random()}>
            <NavItem isActive={is_item_active} hasDropDown={NAV_MENU[page].sub != undefined ? true : false} role="button" isChild={false} aria-expanded="false" href={page_url} label={page_label} uniqueKey={Math.random()} parentNode={page} />
            <div className="dropdown-menu" key role="menu">
              {sub_container}
            </div>
          </li>);
      } else {
        if(page == "news"){
          container.push(<li className="nav-item" key={Math.random()}>
              <NavItem uniqueKey={Math.random()} label={page_label} href={page_url} isActive={"posts" === this.props.currentRoute ? true : false} isChild={false} parentNode={page} />
            </li>);
        }
        else{
          container.push(<li className="nav-item" key={Math.random()}>
              <NavItem uniqueKey={Math.random()} label={page_label} href={page_url} isActive={page === this.props.currentRoute ? true : false} isChild={false} parentNode={page} />
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
