import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.module.scss';
import SecondaryNav from './secondaryNav.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';
// import TwitterFeed from '../../components/TwitterFeed';    --  NOTE: Replace with Mastodom feed - KANBAN-581
import LoadingSpinner from '../../components/loadingSpinner.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { WORDPRESS_POST_BASE_URL } from '../../constants';
import * as MastodonTimeline from '@idotj/mastodon-embed-timeline';
import '../../css/mastodon-timeline.min.css';
import { useState, useEffect, useRef } from 'react';

const WordpressPostList = () => {
  const { data: postList, isLoading } = usePageLoadingQuery(WORDPRESS_POST_BASE_URL);

  const title = 'News and Events';

  const containerRef = useRef(null);
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (containerRef.current != null && !init) {
      setInit(true);
      initMt();
    }
  }, [containerRef.current, init]);

  return (
    <div className={style.wordPressContainer}>
      <HeadMetaTags title={title} />
      <SecondaryNav title={title} type="post" />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {isLoading && <LoadingSpinner />}
            {postList &&
              postList.map((post) => {
                if (post.status !== 'publish') {
                  return null;
                }
                const link = `/news/${post.slug}`;
                return (
                  <div className={style.postContainer} key={post.id}>
                    <Link to={link}>
                      <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                  </div>
                );
              })}
          </div>
          <div className="col-md-4 border-left">
            {/* <TwitterFeed />   NOTE: Replace with Mastodom feed - KANBAN-581 */}
            <div ref={containerRef} className="dummy-wrapper-timeline">
              <div id="mt-container" className="mt-container">
                <a
                  className="mt-btn-violet btn-see-more"
                  href="https://genomic.social/@AllianceGenome"
                  rel="nofollow noopener noreferrer"
                  target="_blank"
                  style={{ display: 'inline-block', textAlign: 'center' }}
                >
                  Alliance Mastodon
                </a>
                <div className="mt-body" role="feed">
                  <div className="mt-loading-spinner"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function initMt() {
  (async () => {
    try {
      const instanceUrl = 'https://genomic.social';
      const localUser = 'AllianceGenome';
      const res = await fetch(`${instanceUrl}/api/v1/accounts/lookup?acct=${encodeURIComponent(localUser)}`);
      const user = await res.json();

      new MastodonTimeline.Init({
        instanceUrl,
        timelineType: 'profile',
        userId: String(user.id),
        profileName: '@AllianceGenome',
        insistSearchContainer: true,

        maxNbPostFetch: '10',
        maxNbPostShow: '5',
        hidePreviewLink: true,
        txtMaxLines: '3',
        btnSeeMore: '',
      });
    } catch (error) {
      console.error('Failed to load Mastodon timeline:', error);
    }
  })();
}

export default WordpressPostList;
