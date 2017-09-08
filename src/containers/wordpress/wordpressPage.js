/*eslint-disable no-unused-vars*/
/*** This component renders wordpress static page **/

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import style from './style.css';
import HeadMetaTags from '../../components/headMetaTags';
import SecondaryNav from './secondaryNav';

class WordpressPage extends Component {
  render() {
    let title = this.props.data.title.rendered;
    let parent_id = (this.props.data.parent>0)?this.props.data.parent:this.props.data.id;
    return (
      <div>
        <HeadMetaTags title={title} />
        <SecondaryNav  id={this.props.data.id} parent={parent_id} title={title} type='page' />
        <div dangerouslySetInnerHTML={{ __html: this.props.data.content.rendered}} />
      </div>
    );

  }
}

WordpressPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WordpressPage;
