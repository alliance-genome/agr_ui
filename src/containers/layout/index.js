import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import style from './style.css';
import Loader from './loader/index';
import logo from './agrLogo.png';
import SearchBar from './searchBar';

import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../../constants';

class Layout extends Component {
  render() {
    return (
      <div className={style.appContainer}>
        <div className={`alert alert-info ${style.appAlert}`} role='alert'>
          This website is a prototype and information may not be verified.
        </div>
        <div className={`alert alert-warning ${style.appAlert}`} role='alert'>
          Internal Development Release. Submit bugs <a href='https://github.com/alliance-genome/agr/issues'>here.</a>
        </div>
        <div className={style.topHeader}>
          <div className='row'>
            <div className={SMALL_COL_CLASS}>
              <Link to='/'>
                <img className={style.logo} src={logo} />
              </Link>
            </div>
            <div className={LARGE_COL_CLASS} />
          </div>
        </div>
        <nav className={`navbar navbar-light bg-faded ${style.midHeader}`}>
          <div className='row'>
            <div className={SMALL_COL_CLASS}>
              <div className={style.nav}>
                <Link className={`nav-link ${style.navLink}`} to='/'><i className='fa fa-home' /> Home</Link>
                <Link className={`nav-link ${style.navLink}`} to='/about'><i className='fa fa-info-circle' /> About</Link>
                <Link className={`nav-link ${style.navLink}`} to='/help'><i className='fa fa-question-circle' /> Help</Link>
              </div>
            </div>
            <div className={LARGE_COL_CLASS}>
              <SearchBar />
            </div>
          </div>
        </nav>
        <div className={style.loaderContentContainer}>
          <Loader />
          <div className={style.contentContainer}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node
};

export default Layout;
