import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './style.css';
import { SUB_MENU, WORDPRESS_PAGES} from '../../constants';


class SubMenu extends Component {
  render() {
    let container=[];
    let page_key= this.props.path;
    if(!(page_key in SUB_MENU )){return(<div />);}
    for(var index in SUB_MENU[page_key]){
      let page=SUB_MENU[page_key][index];
      container.push(
        <li className={style.subMenuListItem} key={index}>
          <Link className={`${style.sub_nav_link}`} key={index} to={`/${WORDPRESS_PAGES[page].slug}`}>
            {WORDPRESS_PAGES[page].label}
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
  path: PropTypes.string
};
export default SubMenu;
