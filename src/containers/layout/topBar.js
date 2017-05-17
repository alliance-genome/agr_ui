import React, {Component} from 'react';
import { Link } from 'react-router';

import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../../constants';
import SocialMedia from './socialMedia';

import style from './style.css';

class TopBar extends Component {
  render() {
    let email_link='mailto:info@alliancegenome.org';
    let email_logo='info@alliancegenome.org';
   
    return (
      <div className={`col-xs-12 ${style.topBar} ${style.solidBg}`}>
        <div className={style.content}>
          <div className={`${SMALL_COL_CLASS} ${style.miniBidgets}`}>
            <span className={`${style.miniContact} ${style.email}`}>
              <Link to={email_link}><i className='fa fa-envelope' /> {email_logo}</Link>
            </span>
          </div>
          <div className={`${LARGE_COL_CLASS} ${style.rightWidgets} ${style.miniBidgets}`}>
            <SocialMedia />
          </div>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  email_link: React.PropTypes.string,
};

export default TopBar;
