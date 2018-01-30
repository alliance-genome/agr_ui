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
} from "../../../constants";
const HOME_ROUTE = '/home';

class MenuItems extends Component{
  render(){
    debugger;
    let container = [];
   for(var item in MENU){
     let page = MENU[item];
     let page_path = page === "news" ? WP_POST_PATH : WP_PATH;
     let page_url = page_path + "/" + NAV_MENU[page].slug;
     if (page_url === HOME_ROUTE) page_url = "/";
     let page_label = NAV_MENU[page].label;
    if (NAV_MENU[page].sub != undefined) {
      let sub_container = [];
     for (let subItem in NAV_MENU[page].sub) {
        let sub_page_url = page_path + "/" + NAV_MENU[page].sub[subItem].slug;
       sub_container.push(<span>
           <a href={sub_page_url} className={`dropdown-item`} key={NAV_MENU[page].sub[subItem].id}>
             {NAV_MENU[page].sub[subItem].label}
           </a></span>);
      }
     container.push(
       <li className="nav-item dropdown" key={NAV_MENU[page].id}>
          <a className={`nav-link dropdown-toggle`} data-toggle="dropdown" role="button" aria-expanded="false" href={page_url}>
            {page_label} <span className="caret" />
          </a>
          <div className="dropdown-menu dropdown-menu-right" role="menu">
            {sub_container}
          </div>
        </li>
      );

    }
    else {
      container.push(<li key={NAV_MENU[page].id} className="nav-item">
          <a className={`nav-link`} href={page_url}>
            {page_label}
          </a>
        </li>);
    }

   }
    return <div className="collapse navbar-toggleable-md" id="exCollapsingNavbar2">
        <ul className="nav nav-tabs">{container}</ul>
      </div>;

  }
}

export default MenuItems;
