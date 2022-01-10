import React  from 'react';
import style from './style.scss';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import PropTypes from "prop-types";

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

const WordpressNews = ({urlNewsMod, fetchNewsCount, linkToNewsPage}) => {
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
              postList && parseWordpressPosts(postList).map(post => {
                if (post.status !== 'publish') { return; }
                if (count > fetchNewsCount) { return; }
                count++;
                let key = "news_" + count;
                post.text = post.text.replace(/\[&hellip;\]/, '<a href="' + post.link + '">[&hellip;]<\a>');
                return (
                  <div className={style.postContainer} 
                       key={key}
                       data-testid={'div_news_' + count}>
                    <a href={post.link}
                       data-testid={'href_news_' + count} >
                      <h4 className={style.h4extra}
                          dangerouslySetInnerHTML={{ __html: post.title}} 
                          data-testid={'header_news_' + count}/>
                    </a>
                    <p dangerouslySetInnerHTML={{ __html: post.text}}
                       data-testid={'text_news_' + count}  />
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className={`row ${style.moreNews}`}
             data-testid={'more_news_div'}>
          <a href={linkToNewsPage} 
             data-testid={'more_news_link'}>
            <i>more news&hellip;</i>
          </a>
        </div>
      </div>
    </div>
  );
};

WordpressNews.propTypes = {
  urlNewsMod: PropTypes.string.isRequired,
  fetchNewsCount: PropTypes.number.isRequired,
  linkToNewsPage: PropTypes.string.isRequired
}

export default WordpressNews;
