/*eslint-disable no-unused-vars*/
/*** This component renders wordpress post page **/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './../style.css';
import NewsSubMenu from './newsSubMenu';
import HeadMetaTags from '../../../components/headMetaTags';

class WordpressPosts extends Component {
  render() {
    let container=[];
    let post_slug=this.props.data.slug;
    let post_status=this.props.data.status;
    let post_title=this.props.data.title.rendered;
    let post_image=this.props.data.featured_media_url;
    let post_content=this.props.data.content.rendered;
    post_content='<h2>'+post_title+'</h2><p>'+post_content;
    let index=0;
    return (
      <div>
        <HeadMetaTags title={post_title} />
        <NewsSubMenu title={post_title} />
        <div className={`container ${style.postPageContainer}`}>
          <div className='row'>
            <div className={`col-xs-12 col-sm-5 ${style.floatLeft}`}>
              <img className='img-fluid' src={post_image}  />
            </div>
            <div dangerouslySetInnerHTML={{ __html: post_content}} />
          </div>
        </div>
      </div>
    );
  }
}

WordpressPosts.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WordpressPosts;
