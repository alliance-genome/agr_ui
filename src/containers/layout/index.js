import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './style.css';
import Loader from './loader/index';
import logo from './agrLogo.png';
import SearchBar from './searchBar';

import TopBar from './topBar';
import FooterBar from './footer';
import Menu from './menu';
import SiteMap from './siteMap';
import AgrTweets from './twitterWidget';

import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../../constants';

class Layout extends Component {
  render() {
    let currentRoute=this.props.location.pathname.replace('/','');
    currentRoute= currentRoute==''?'home' : currentRoute;

    return (
      <div className={style.appContainer}>
        <div className={`alert alert-warning ${style.appAlert}`} role='alert'>
          This website is a prototype and information may not be verified. Submit bugs <a href='https://agr-jira.atlassian.net'>here.</a>
        </div>

        <TopBar />

        <nav className='navbar fixed-top'>
          <div className='container'>
            <div className='row'>
              <div className={SMALL_COL_CLASS}>
                <Link className='navbar-brand' to='/'>
                  <img height='80' src={logo} />
                </Link>
              </div>
              <div className={LARGE_COL_CLASS}>
                <SearchBar />
              </div>
            </div>

          </div>
        </nav>

        <nav className={`navbar ${style.midHeader} ${currentRoute}`}>
            <div className='container'>
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

        <div className={style.siteMapContainer}>
          <div className='container'>
            <div className='row'>
              <div className={SMALL_COL_CLASS}>
                <SiteMap />
              </div>
              <div className={LARGE_COL_CLASS}>
                <div className={style.sectionHeader}>
                  <h4>Recent Tweets</h4>
                </div>
                <div id='tweets'>
                  <AgrTweets />
                </div>
              </div>
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
