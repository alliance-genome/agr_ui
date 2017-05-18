import React, {Component} from 'react';
import { Link } from 'react-router';

class SocialMedia extends Component {
  render() {
    let facebook_link='https://www.facebook.com/alliancegenome/';
    let github_link='https://github.com/alliance-genome';
    let twitter_link='https://twitter.com/alliancegenome';
    
    let facebook_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/facebook.png';
    let github_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/github.png';
    let twitter_logo='http://www.alliancegenome.org/wp-content/uploads/2017/01/twitter.png';
   
    return (
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
    );
  }
}
export default SocialMedia;
