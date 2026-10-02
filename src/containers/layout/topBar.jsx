import React from 'react';
import { Link } from 'react-router-dom';

import SocialMedia from './SocialMedia';

import style from './style.module.scss';

const TopBar = () => {
  return (
    <div className={style.topBar}>
      <div className="align-items-center container-fluid d-flex justify-content-between py-2">
        <span>
          Questions? <Link to="/contact-us">Contact Us</Link>
        </span>
        <SocialMedia />
      </div>
    </div>
  );
};

export default TopBar;
