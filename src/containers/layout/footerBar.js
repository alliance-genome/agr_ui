import React, {Component} from 'react';
import { Link } from 'react-router';

import style from './style.scss';
import SocialMedia from './socialMedia';
import logo from './logofooter-1.png';

class FooterBar extends Component {
  render() {
    return (
      <div className={style.footerBar}>
        <div className='align-items-center container d-flex justify-content-between'>
          <Link to='/'>
            <img height='50' src={logo} />
          </Link>
          <SocialMedia />
        </div>
      </div>
    );
  }
}
export default FooterBar;
