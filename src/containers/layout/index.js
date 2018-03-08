import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './style.css';
import Loader from './loader/index';
import logo from './agrLogo.png';
import SearchBar from './searchBar';

import TopBar from './topBar';
import FooterBar from './footer';
import SiteMap from './siteMap';
import AgrTweets from './twitterWidget';
import MenuItems from './navigation/menuItems';

import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../../constants';

class Layout extends Component {

  render() {
    let currentRoute = this.props.location.pathname.replace('/', '');
    currentRoute = currentRoute == '' ? 'home' : currentRoute;

    return (
      <div>
        <TopBar />
        <div className={style.appContainer}>
          <nav className={`navbar fixed-top ${style.navbarCustom}`}>
            <div className="container">
              <div className="row">
                <div className="col-sm-3 col-md-3">
                  <div className="navbar-header">
                    <button
                      className="navbar-toggler hidden-sm-up pull-right"
                      type="button"
                      data-target="#exCollapsingNavbar2"
                      data-toggle="collapse"
                    >
                      &#9776;
                    </button>
                    <Link className="navbar-brand" to="/">
                      <img
                        className={`img-fluid ${style.agrLogo}`}
                        src={logo}
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 pull-right">
                  <SearchBar />
                </div>
              </div>
              <div className="row" style={{ marginLeft: '0.1rem' }}>
                <MenuItems currentRoute={currentRoute} />
              </div>
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
            <div className="container">
              <div className="row">
                <div className={SMALL_COL_CLASS}>
                  <SiteMap />
                </div>
                <div className={LARGE_COL_CLASS}>
                  <div className={style.sectionHeader}>
                    <h4>Recent Tweets</h4>
                  </div>
                  <div id="tweets">
                    <AgrTweets />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterBar />
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
};

export default Layout;
