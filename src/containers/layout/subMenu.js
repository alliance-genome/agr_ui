import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './style.css';
import { SUB_MENU, WP_PAGES} from '../../constants';


class SubMenu extends Component {
  render() {
    let container=[];
    let page_key= this.props.path;
    if(!(page_key in SUB_MENU )){return(<div />);}
    for(var index in SUB_MENU[page_key]){
      let page=SUB_MENU[page_key][index];
      container.push(
        <li className={style.subMenuListItem}>
          <Link className={`${style.sub_nav_link}`} key={index} to={`/wordpress/${WP_PAGES[page].path}`}>
            {WP_PAGES[page].label}
          </Link>
        </li>
      );
    }
    return (
      <div className={`${style.sub_nav} ${page_key}`}>
        <ul className='list-unstyled'>
          {container}
        </ul>
      </div>
    );
  }
}
SubMenu.propTypes={
  path: React.PropTypes.string
};
export default SubMenu;
