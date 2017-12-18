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
       sub_container.push(
         <li key={NAV_MENU[page].sub[subItem].id} >
            <a href={sub_page_url} className={`${style.sub_nav_link}`}>{NAV_MENU[page].sub[subItem].label}</a>
          </li>
        );
      }
     container.push(
       <li className="dropdown" key={NAV_MENU[page].id}>
          <a className={`nav-link dropdown-toggle`} data-toggle="dropdown" role="button" aria-expanded="false" href={page_url}>
            {page_label} <span className="caret" />
          </a>
          <ul className="dropdown-menu" role="menu">
            {sub_container}
          </ul>
        </li>
      );

    }
    else {
      container.push(<li key={NAV_MENU[page].id}>
          <a className={`nav-link`} href={page_url}>
            {page_label}
          </a>
        </li>);
    }

   }
    return (
          <div className="navbar-wrapper">
              <nav className="navbar navbar-default navbar-static-top offset-3 pull right">
                <div className="container">
                  <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                      <span className="sr-only">Toggle navigation</span>
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                      <span className="icon-bar" />
                    </button>
                    <a className="navbar-brand pull left" href="#">
                      <img src={logo} />
                    </a>
                  </div>
                  <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                      {container}
                    </ul>
                  </div>
                </div>
              </nav>
          </div>
    );

  }
}

export default MenuItems;
