import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import HeadMetaTags from '../../components/headMetaTags';
import LoadingPage from '../../components/loadingPage';
import SecondaryNav from './secondaryNav';
import NotFound from '../../components/notFound';
import ReplaceLinks from './ReplaceLinks';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import fetchWordpress from '../../lib/fetchWordpress';
import { WORDPRESS_PAGE_BASE_URL } from '../../constants';

const WordpressPage = ({slug}) => {
  const {
    data: page,
    isLoading,
    isError,
  } = usePageLoadingQuery(WORDPRESS_PAGE_BASE_URL + slug, fetchWordpress);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !page) {
    return <NotFound />;
  }

  const title = page.title.rendered;
  let parentId = (page.parent > 0) ? page.parent : page.id;
  return (
    <div className={style.wordPressContainer}>
      <HeadMetaTags title={title} />
      {slug !== 'home' && <SecondaryNav parent={parentId} slug={slug} title={title} type='page' />}
      {slug !== 'home' && <ReplaceLinks html={page.content.rendered} />}
    </div>
  );
};

WordpressPage.propTypes = {
  slug: PropTypes.string,
};

export default WordpressPage;
