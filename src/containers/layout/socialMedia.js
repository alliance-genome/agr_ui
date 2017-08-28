import React, {Component} from 'react';

import style from './style.css';

class SocialMedia extends Component {
  render() {
    let facebook_link='https://www.facebook.com/alliancegenome/';
    let github_link='https://github.com/alliance-genome';
    let twitter_link='https://twitter.com/alliancegenome';

    let facebook_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/facebook.png';
    let github_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/github.png';
    let twitter_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/twitter.png';

    return (
      <span className={style.socialLinks}>
        <a href={facebook_link}>
          <img src={facebook_logo} />
        </a>
        <a href={twitter_link}>
          <img src={twitter_logo} />
        </a>
        <a href={github_link}>
          <img src={github_logo} />
        </a>
      </span>
    );
  }
}
export default SocialMedia;
