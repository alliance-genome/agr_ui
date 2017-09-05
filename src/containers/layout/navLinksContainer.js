import React, { Component } from 'react';

import style from './style.css';
import SubMenu from './subMenu';
import NavLink from './navLink';
import { MENU, WP_PAGES ,WP_PATH ,WP_POST_PATH } from '../../constants';


class NavLinksContainer extends Component {
  render() {
    let container=[];
    for(var index in MENU){
      let page=MENU[index];
      let page_path=(page==='news')?WP_POST_PATH:WP_PATH;
      let page_url=page_path+'/'+WP_PAGES[page].path;
      let page_label=WP_PAGES[page].label;
      let link_token=[];
      if(page==='news'){
        link_token.push(<a className={`nav-link ${style.navLink}`} href={page_url} key={index}>{page_label}</a>);
      }
      else{link_token.push(<NavLink key={index} label={page_label} url={page_url} />);}
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
  type: React.PropTypes.string,
};
export default NavLinksContainer;
