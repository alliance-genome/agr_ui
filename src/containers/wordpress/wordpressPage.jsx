import React from 'react';
import style from './style.module.scss';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import LoadingPage from '../../components/loadingPage.jsx';
import SecondaryNav from './secondaryNav.jsx';
import NotFound from '../../components/notFound.jsx';
import ReplaceLinks from './ReplaceLinks.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import fetchWordpress from '../../lib/fetchWordpress';
import { WORDPRESS_PAGE_BASE_URL } from '../../constants';
import { useParams } from 'react-router-dom';

const WordpressPage = () => {
  const { slug } = useParams();
  const { data: page, isLoading, isError } = usePageLoadingQuery(WORDPRESS_PAGE_BASE_URL + slug, fetchWordpress);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !page) {
    return <NotFound />;
  }

  const title = page.title.rendered;
  let parentId = page.parent > 0 ? page.parent : page.id;
  return (
    <div className={style.wordPressContainer}>
      <HeadMetaTags title={title} />
      {slug !== 'home' && <SecondaryNav parent={parentId} slug={slug} title={title} type="page" />}
      {slug !== 'home' && <ReplaceLinks html={page.content.rendered} />}
    </div>
  );
};

WordpressPage.propTypes = {};

export default WordpressPage;
