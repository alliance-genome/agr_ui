import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import style from './style.css';
import Loader from './loader/index';
import logo from './agrLogo.png';
import SearchBar from './searchBar';
import TopBar from './topBar';
import FooterBar from './footerBar';
import SiteMap from './siteMap';
import AgrTweets from './twitterWidget';
import { MenuItems } from './navigation';

class Layout extends Component {

  render () {
    let currentRoute = this.props.location.pathname.replace('/', '');
    currentRoute = currentRoute === '' ? 'home' : currentRoute;

    return (
      <div className={style.appContainer}>
        <div className='d-none d-md-block'>
          <TopBar />
        </div>

        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-md'>
              <Link className='navbar-brand' to='/'>
                <img className={`img-fluid ${style.agrLogo}`} src={logo} />
              </Link>
              <button aria-controls="exCollapsingNavbar2" aria-expanded="false" aria-label="Toggle navigation"
                      className="navbar-toggler float-right d-block d-md-none" data-target="#exCollapsingNavbar2"
                      data-toggle="collapse" type="button"
              >
                &#9776;
              </button>
            </div>
            <div className='col-md'>
              <SearchBar />
            </div>
          </div>
        </div>

        <MenuItems currentRoute={currentRoute} />

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
              <div className='col-sm-6 col-md-6 col-12'>
                <div>
                  <h4>Recent Tweets</h4>
                </div>
                <div id='tweets'>
                  <AgrTweets />
                </div>
              </div>
              <div className='col-sm-6 col-md-6 col-12'>
                <SiteMap />
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
  location: PropTypes.object,
};

export default Layout;
