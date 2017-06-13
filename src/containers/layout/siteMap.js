import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './style.css';
import SubMenu from './subMenu';
import { MENU, WP_PAGES } from '../../constants';


class SiteMap extends Component {
  render() {
    let container=[];
    for(var index in MENU){
      let page=MENU[index];
      container.push(<div className={style.navContainer} key={index}>
          <Link className={`nav-link ${style.navLink}`} to={`/wordpress/${WP_PAGES[page].path}`}>{WP_PAGES[page].label}  </Link>
          <SubMenu path={page} />
         </div>);
    }
    return (
      <div className={style.site_map}>
       <div className={`col-xs-12 ${style.sectionHeader}`}><h3>Site Map</h3></div>
       {container}
      </div>
    );
  }
}
export default SiteMap;
