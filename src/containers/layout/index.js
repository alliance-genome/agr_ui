import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import style from './style.css';
import Loader from './loader/index';
import logo from './agrLogo.png';
import SearchBar from './searchBar';

import TopBar from './topBar';
import FooterBar from './footer';
import Menu from './menu';

import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../../constants';

class Layout extends Component {
  render() {
    let currentRoute=this.props.location.pathname.replace('/','');
    currentRoute= currentRoute==''?'home' : currentRoute;

    return (
      <div className={style.appContainer}>
        <TopBar />
        <div className={style.topHeader}>
          <div className={`row ${style.content}`}>
            <div className={SMALL_COL_CLASS}>
              <Link to='/'>
                <img className={style.logo} src={logo} />
              </Link>
            </div>
            <div className={LARGE_COL_CLASS}>
              <SearchBar />
            </div>
          </div>
        </div>
        <nav className={`navbar ${style.midHeader} ${currentRoute}`}>
            <div className={style.content}>
              <Menu />
            </div>
        </nav>
        <div className={style.loaderContentContainer}>
          <div className={style.content}>
            <Loader />
            <div className={style.contentContainer}>
              {this.props.children}
            </div>
          </div>
        </div>
        <FooterBar />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
};

export default Layout;
