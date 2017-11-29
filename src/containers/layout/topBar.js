import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { HELP_EMAIL } from '../../constants';
import SocialMedia from './socialMedia';

import style from './style.css';

class TopBar extends Component {
  render() {
    return (
      <nav className={`navbar fixed-top ${style.solidBg}`}>
        <div className='container'>
          <div className='row'>
            <div className='col-xs-6'>
              <span className={`navbar-text ${style.miniContact}`}>
                Questions? <a href={`mailto:${HELP_EMAIL}`}>Contact Us</a>
              </span>
            </div>
            <div className='col-xs-6 pull-right text-xs-right'>
              <SocialMedia />
            </div>
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
