import React, {Component} from 'react';
import PropTypes from 'prop-types';

import SocialMedia from './socialMedia';

import style from './style.css';

class TopBar extends Component {
  render() {
    let email_link='mailto:info@alliancegenome.org';
    let email_logo='info@alliancegenome.org';

    return (
      <nav className={`navbar fixed-top ${style.solidBg}`}>
        <div className='row'>
          <div className='col-xs-6'>
            <span className={`navbar-text ${style.miniContact}`}>
              <a href={email_link}><i className='fa fa-envelope' /> {email_logo}</a>
            </span>
          </div>
          <div className='col-xs-6 pull-right text-xs-right'>
            <SocialMedia />
          </div>
        </div>
      </nav>
    );
  }
}

TopBar.propTypes = {
  email_link: PropTypes.string,
};

export default TopBar;
