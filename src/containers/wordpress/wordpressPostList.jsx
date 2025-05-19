import React  from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import SecondaryNav from './secondaryNav.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';
// import TwitterFeed from '../../components/TwitterFeed';    --  NOTE: Replace with Mastodom feed - KANBAN-581
import LoadingSpinner from '../../components/loadingSpinner.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { WORDPRESS_POST_BASE_URL } from '../../constants';

const WordpressPostList = () => {
  const {
    data: postList,
    isLoading
  } = usePageLoadingQuery(WORDPRESS_POST_BASE_URL);

  const title = 'News and Events';

  return (
    <div className={style.wordPressContainer}>
      <HeadMetaTags title={title} />
      <SecondaryNav title={title} type='post' />
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            {isLoading && <LoadingSpinner />}
            {
              postList && postList.map(post => {
                if (post.status !== 'publish') { return null; }
                const link = `/news/${post.slug}`;
                return (
                  <div className={style.postContainer} key={post.id}>
                    <Link to={link}>
                      <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered}} />
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered}} />
                  </div>
                );
              })
            }
          </div>
          <div className='col-md-4 border-left'>
            {/* <TwitterFeed />   NOTE: Replace with Mastodom feed - KANBAN-581 */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordpressPostList;
