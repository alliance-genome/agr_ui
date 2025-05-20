/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import style from './style.module.scss';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import LoadingPage from '../../components/loadingPage.jsx';
import SecondaryNav from './secondaryNav.jsx';
import ReplaceLinks from './ReplaceLinks.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { WORDPRESS_POST_URL } from '../../constants';
import fetchWordpress from '../../lib/fetchWordpress';
import {useParams} from "react-router-dom";

const WordpressPost = () => {
  const { slug } = useParams();
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

WordpressPost.propTypes = {};

export default WordpressPost;
