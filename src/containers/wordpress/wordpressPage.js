/*eslint-disable no-unused-vars*/
/*** This component renders wordpress static page **/

import React, {Component} from 'react';
import { Link } from 'react-router';

import style from './style.css';
import HeadMetaTags from '../../components/headMetaTags';

class WordpressPage extends Component {
  render() {
    let title = this.props.data.title.rendered;
    return (
      <div>
        <HeadMetaTags title={title} />
        <div dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered}} />
      </div>
    );

  }
}

WordpressPage.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default WordpressPage;
