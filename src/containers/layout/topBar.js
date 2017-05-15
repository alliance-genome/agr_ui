import React, {Component} from 'react';
import { Link } from 'react-router';

import { SMALL_COL_CLASS, LARGE_COL_CLASS } from '../../constants';

import style from './style.css';

class TopBar extends Component {
  render() {
    let email_link='mailto:info@alliancegenome.org';
    let facebook_link='https://www.facebook.com/alliancegenome/';
    let github_link='https://github.com/alliance-genome';
    let twitter_link='https://twitter.com/alliancegenome';
    
    let email_logo='info@alliancegenome.org';
    let facebook_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/facebook.png';
    let github_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/github.png';
    let twitter_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/twitter.png';
   
    return (
      <div className={`col-xs-12 ${style.topBar} ${style.solidBg}`}>
        <div className={style.content}>
          <div className={`${SMALL_COL_CLASS} ${style.miniBidgets}`}>
            <span className={`${style.miniContact} ${style.email}`}>
              <Link to={email_link}><i className='fa fa-envelope' /> {email_logo}</Link>
            </span>
          </div>
          <div className={`${LARGE_COL_CLASS} ${style.rightWidgets} ${style.miniBidgets}`}>
              <p>
                <Link to={facebook_link}>
                  <img src={facebook_logo} />
                </Link>
                <Link to={twitter_link}>
                  <img src={twitter_logo} />
                </Link>
                <Link to={github_link}>
                  <img src={github_logo} />
                </Link>
              </p>
          </div>
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
  email_link: React.PropTypes.string,
  facebook_link: React.PropTypes.string,
  github_link: React.PropTypes.string,
  twitter_link: React.PropTypes.string,
};

export default TopBar;
