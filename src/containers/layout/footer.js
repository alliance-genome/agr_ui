import React, {Component} from 'react';
import { Link } from 'react-router';

import style from './style.css';
import SocialMedia from './socialMedia';
import logo from './logofooter-1.png';

class FooterBar extends Component {
  render() {
    return (
      <div className={style.footerBar}>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6'>
                <Link to='/'>
                  <img height='50' src={logo} />
                </Link>
            </div>
            <div className='col-xs-6 pull-right text-xs-right'>
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default FooterBar;
