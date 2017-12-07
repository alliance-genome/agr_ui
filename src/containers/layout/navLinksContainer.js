import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './style.css';
import SubMenu from './subMenu';
import { MENU, WP_PAGES ,WP_PATH ,WP_POST_PATH } from '../../constants';

const HOME_ROUTE = '/home';

class NavLinksContainer extends Component {
  render() {
    let container=[];
    for(var index in MENU){
      let page=MENU[index];
      let page_path=(page==='news')?WP_POST_PATH:WP_PATH;
      let page_url=page_path+'/'+WP_PAGES[page].slug;
      if (page_url === HOME_ROUTE) page_url = '/';
      let page_label=WP_PAGES[page].label;
      let link_token=[];
      link_token.push(<Link className={`nav-link ${style.navLink}`} key={index} to={page_url}>{page_label}</Link>);
      container.push(<div className={style.navContainer} key={index}>
          {link_token}
          <SubMenu key={index} path={page} />
         </div>);
    }
    return (
      <div className={this.props.type}>{container}</div>
    );
  }
}
NavLinksContainer.propTypes={
  type: PropTypes.string,
};
export default NavLinksContainer;
