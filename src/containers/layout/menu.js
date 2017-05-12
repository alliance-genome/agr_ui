import React, { Component } from 'react';
import { Link } from 'react-router';

import style from './style.css';
import { MENU } from '../../constants';


class Menu extends Component {
  render() {
    let container=[];
    Object.keys(MENU).map((page,index)=>{
      container.push(<Link className={`nav-link ${style.navLink}`} key={index} to={MENU[page].path}>{MENU[page].label}</Link>);
    });
    return (
      <div className={style.nav}>
       {container}
      </div>
    );
  }
}
export default Menu;
