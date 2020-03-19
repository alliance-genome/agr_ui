import React, {Component} from 'react';

import { HELP_EMAIL } from '../../constants';
import SocialMedia from './SocialMedia';

import style from './style.scss';

class TopBar extends Component {
  render() {
    return (
      <div className={style.topBar}>
        <div className='align-items-center container-fluid d-flex justify-content-between py-2'>
          <span>Questions? <a href={`mailto:${HELP_EMAIL}`}>Contact Us</a></span>
          <SocialMedia />
        </div>
      </div>
    );
  }
}

export default TopBar;
