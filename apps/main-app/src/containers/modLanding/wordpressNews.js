import React  from 'react';
import style from './style.scss';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import './news.css'; 
const parseWordpressPosts = (wordPressAPIRes) => {
  if (wordPressAPIRes.posts !== undefined) // WP API version 1.1
    return wordPressAPIRes.posts.map(post => {
      return {title: post.title, text: post.excerpt, link: post.URL, status: post.status}
    });
  else { // WP API v2
    return wordPressAPIRes.map(post => {
      return {title: post.title.rendered, text: post.excerpt.rendered, link: post.link, status: post.status}
    });
  }

}

const WordpressNews = ({urlNewsMod, fetchNewsCount}) => {
  const {
    data: postList,
    isLoading
  } = usePageLoadingQuery(urlNewsMod);

  let count=1;
  return (
    <div className={style.wordPressContainer}>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8'>
            {isLoading && <LoadingSpinner />}
            {
              postList && parseWordpressPosts(postList).map(post => {
                if (post.status !== 'publish') { return; }
                if (count>fetchNewsCount){return;}
                count ++;
                return (
                  <div className={style.postContainer}>
                    <a href={post.link}>
                      <h4 dangerouslySetInnerHTML={{ __html: post.title}} />
                    </a>
                    <p dangerouslySetInnerHTML={{ __html: post.text}} />
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordpressNews;
