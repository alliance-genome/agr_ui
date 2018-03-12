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
/* eslint-disable */
class Layout extends Component {

  render() {
    let currentRoute = this.props.location.pathname.replace('/', '');
    currentRoute = currentRoute == '' ? 'home' : currentRoute;

    return <div>
        <div className='hidden-sm-down'>
          <TopBar />
        </div>
        <div className={style.appContainer}>
          <nav className={`navbar navbar-expand-lg fixed-top ${style.navbarCustom}`}>
            <div className="container">
              <div className="row">
                <div className="col-sm-3 col-md-3">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to="/">
                      <img className={`img-fluid ${style.agrLogo}`} src={logo} />
                    </Link>
                  </div>
                </div>
                <div className="col-sm-3 col-md-3">
                  <button className="navbar-toggler hidden-lg-up pull-right" type="button" data-target="#exCollapsingNavbar2" data-toggle="collapse">
                    &#9776;
                  </button>
                </div>

                <div className="col-sm-6 col-md-6 pull-right">
                  <SearchBar />
                </div>
              </div>
              <div className="row" style={{ marginLeft: "0.1rem" }}>
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
                <div className="col-sm-6 col-md-6 col-xs-12">
                  <div>
                    <h4>Recent Tweets</h4>
                  </div>
                  <div id="tweets">
                    <AgrTweets />
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-xs-12">
                  <SiteMap />
                </div>
              </div>
            </div>
          </div>
          <FooterBar />
        </div>
      </div>;
  }
}

Layout.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
};

export default Layout;
