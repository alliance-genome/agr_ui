import React, {Component} from 'react';
import { Link } from 'react-router';

import style from './style.css';
import SocialMedia from './socialMedia';
import logo from './logofooter-1.png';
import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../../constants';

class FooterBar extends Component {
  render() {
    return (
      <div className={`col-xs-12 ${style.footerBar}`}>
        <div className={style.content}>
          <div className={SMALL_COL_CLASS}>
              <Link to='/'>
                <img className={style.logo} src={logo} />
              </Link>
          </div>
          <div className={`${LARGE_COL_CLASS} ${style.rightWidgets}`}>
            <div className={style.socialMediaContainer}><SocialMedia /></div>
          </div>
        </div>
      </div>
    );
  }
}
export default FooterBar;
