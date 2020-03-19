import React from 'react';
import {Link} from 'react-router-dom';
import logo from './logofooter-1.png';
import SocialMedia from './SocialMedia';
import SiteMap from './SiteMap';

import style from './style.scss';

const Footer = () => {
  return (
    <footer className={style.footer}>
      <Link className='mr-2 mb-2' to='/'>
        <img alt='Alliance of Genome Resources logo' height='50' src={logo} />
      </Link>

      <SiteMap />

      <div className='flex-shrink-0 px-md-3'>
        <span className={style.siteMapHeader}>Connect With Us</span>
        <SocialMedia showText />
      </div>
    </footer>
  );
};

export default Footer;
