import React, {Component} from 'react';

import style from './style.css';

class SocialMedia extends Component {
  render() {
    const facebook_link = 'https://www.facebook.com/alliancegenome/';
    const github_link = 'https://github.com/alliance-genome';
    const twitter_link = 'https://twitter.com/alliancegenome';

    return (
      <span className={`pull-right ${style.socialLinks}`}>
        <a href={facebook_link}>
          <i className='fa fa-fw fa-facebook' />
        </a>
        <a href={twitter_link}>
          <i className='fa fa-fw fa-twitter' />
        </a>
        <a href={github_link}>
          <i className='fa fa-fw fa-github' />
        </a>
      </span>
    );
  }
}
export default SocialMedia;
