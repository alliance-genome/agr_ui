/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import HeadMetaTags from '../../components/headMetaTags';
import LoadingPage from '../../components/loadingPage';
import SecondaryNav from './secondaryNav';
import ReplaceLinks from './ReplaceLinks';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { WORDPRESS_POST_URL } from '../../constants';
import fetchWordpress from '../../lib/fetchWordpress';

const WordpressPost = ({slug}) => {
  const {
    data: post,
    isLoading,
    isError
  } = usePageLoadingQuery(WORDPRESS_POST_URL + slug, fetchWordpress);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !post) {
    return null;
  }

  const title = post.title.rendered;
  return (
    <div className={style.wordPressContainer}>
      <HeadMetaTags title={title} />
      <SecondaryNav  title={title} type='post' />
      <div className='container'>
        <div className='row'>
          {post.featured_media_url && <div className={`col-12 col-sm-5 ${style.floatLeft}`}>
            <img className='img-fluid' src={post.featured_media_url}  />
          </div>}
          <ReplaceLinks html={post.content.rendered} />
        </div>
      </div>
    </div>
  );
};

WordpressPost.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default WordpressPost;
