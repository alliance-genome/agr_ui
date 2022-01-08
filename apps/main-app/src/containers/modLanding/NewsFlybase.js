import React  from 'react';
import style from './style.scss';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import PropTypes from "prop-types";

const parseFlybasePosts = (flyBaseAPIRes) => {
  if (flyBaseAPIRes !== undefined) {
    if (flyBaseAPIRes['resultset']['result'][0]['news']) {
      return flyBaseAPIRes['resultset']['result'][0]['news'].map(post => {
        return {title: post.title, text: post.excerpt, link: post.link}
      });
    }
  }
}

const NewsFlybase = ({urlNewsMod, fetchNewsCount, linkToNewsPage}) => {
  const {
    data: postList,
    isLoading
  } = usePageLoadingQuery(urlNewsMod);

  let count = 1;
  return (
    <div className={style.wordPressContainer}>
      <div className='container'>
        <div className='row'>
          <div>
            {isLoading && <LoadingSpinner />}
            {
              postList && parseFlybasePosts(postList).map(post => {
                if (count > fetchNewsCount) { return; }
                count++;
                let key = "news_" + count;
                post.text = post.text.replace(/\[&hellip;\]/, '<a href="' + post.link + '">[&hellip;]<\a>');
                return (
                  <div className={style.postContainer} key={key}>
                    <a href={post.link}>
                      <h4 className={style.h4extra} dangerouslySetInnerHTML={{ __html: post.title}} />
                    </a>
                    <p dangerouslySetInnerHTML={{ __html: post.text}} />
                  </div>
                );
              })
            }
          </div>
        </div>
        { linkToNewsPage && <div className={`row ${style.moreNews}`}>
                              <a href={linkToNewsPage}><i>more news&hellip;</i></a></div> }
      </div>
    </div>
  );
};

NewsFlybase.propTypes = {
  urlNewsMod: PropTypes.string.isRequired,
  fetchNewsCount: PropTypes.number.isRequired
}

export default NewsFlybase;
