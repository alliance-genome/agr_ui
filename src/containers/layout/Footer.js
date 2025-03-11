import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/images/alliance_logo_light.png';
import SocialMedia from './SocialMedia';
import SiteMap from './SiteMap';

import style from './style.module.scss';


const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className='container d-flex flex-column flex-lg-row'>

        <div className={style.footerLogo}>
          <Link to='/'>
            <img alt='Alliance of Genome Resources logo' height='50' src={logo} />
          </Link>
        </div>

        <SiteMap />

        {/* <div className='flex-shrink-0 px-lg-3'>
          <span className={style.siteMapHeader}>Connect With Us</span>
          <SocialMedia showText />
        </div> */}

      </div>
    </footer>
  );
};

export default Footer;
