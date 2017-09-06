/*eslint-disable no-unused-vars*/
/*** This component builds the 'News & Events' page **/

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import style from './../style.css';
import NewsSubMenu from './newsSubMenu';
import HeadMetaTags from '../../../components/headMetaTags';
import{ WP_POST_MAX_COUNT ,WP_POST_PATH} from '../../../constants';

class WordpressNews extends Component {
  render() {
    let container=[];
    let post_title='News And Events';
    /* keep trck of the number of published posts */
    let posts_count=1;
    for(var index in this.props.data){
      if(posts_count>WP_POST_MAX_COUNT) break;
      let post_slug=this.props.data[index].slug;
      let post_status=this.props.data[index].status;
      let post_title=this.props.data[index].title.rendered;
      let post_image=this.props.data[index].featured_media_url;
      let post_excerpt=this.props.data[index].excerpt.rendered;

      /* only display published posts */
      if(post_status !='publish') continue;
      container.push(<div className={`row ${style.postContainer}`} key={index}>
          <div className='col-xs-12 col-sm-4'>
            <Link href={`${WP_POST_PATH}/${post_slug}`}>
              <img className='img-fluid' src={post_image} /> </Link></div>
          <div className='col-xs-12 col-sm-8'>
             <Link to={`${WP_POST_PATH}/${post_slug}`}>
               <h3 dangerouslySetInnerHTML={{ __html: post_title}} /></Link>
             <p dangerouslySetInnerHTML={{ __html: post_excerpt}} /></div>
         </div>);
      ++posts_count;
    }

    return (
      <div>
        <HeadMetaTags title={post_title} />
        <NewsSubMenu title={post_title} />
        <div className={`container ${style.newsContainer}`}>
          {container}
        </div>
      </div>
    );
  }
}

WordpressNews.propTypes = {
  data: PropTypes.object.isRequired,
};

export default WordpressNews;
