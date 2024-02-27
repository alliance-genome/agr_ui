import React from 'react';
import PropTypes from 'prop-types';
import ReplaceLinks from './ReplaceLinks';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { WORDPRESS_PAGE_BASE_URL } from '../../constants';
import fetchWordpress from '../../lib/fetchWordpress';
import LoadingSpinner from '../../components/loadingSpinner';

const WordpressInject = ({slug}) => {
  const {
    data: post,
    isLoading,
    isError
  } = usePageLoadingQuery(WORDPRESS_PAGE_BASE_URL + slug, fetchWordpress);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !post) {
    return null;
  }

  return (
    <ReplaceLinks html={post.content.rendered} />
  );
};

WordpressInject.propTypes = {
  slug: PropTypes.string.isRequired,
};

export default WordpressInject;
