import React  from 'react';
import style from './style.module.scss';
import ExternalLink from '../../components/ExternalLink';
import LoadingSpinner from '../../components/loadingSpinner';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import PropTypes from "prop-types";

const parseZfinPosts = (zfinAPIRes) => {
  if (zfinAPIRes !== undefined) {
    if (zfinAPIRes['results']) {
      return zfinAPIRes['results'].map(post => {
        return {title: post.title, link: post.url}
      });
    }
  }
}

const NewsZfin = ({urlNewsMod, fetchNewsCount, linkToNewsPage}) => {
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
              postList && parseZfinPosts(postList).map(post => {
                if (count > fetchNewsCount) { return null; }
                count++;
                let key = "news_" + count;
                if (post.text !== undefined) {
                  post.text = post.text.replace(/\[&hellip;\]/, '<a href="' + post.link + '">[&hellip;]<\\a>');
                }
                return (
                  <div className={style.postContainer} key={key} data-testid={'div_news_' + count}>
                    <h4 className={style.h4extra} data-testid={'header_news_' + count}>
                      <ExternalLink data-testid={'href_news_' + count} href={post.link}>{post.title}</ExternalLink>
                    </h4>
                  </div>
                );
              })
            }
          </div>
        </div>
        {linkToNewsPage && <div className={`row ${style.moreNews}`} data-testid={'more_news_div'}>
          <ExternalLink data-testid={'more_news_link'} href={linkToNewsPage}><i>more news&hellip;</i></ExternalLink>
        </div>}
      </div>
    </div>
  );
};

// Zfin News API does not have text / excerpt content, if gets added, put this line after the <a> tag
//                     <p dangerouslySetInnerHTML={{ __html: post.text}} data-testid={'text_news_' + count} />
// and extract  text: post.excerpt,  into the parseZfinPosts.


NewsZfin.propTypes = {
  urlNewsMod: PropTypes.string.isRequired,
  fetchNewsCount: PropTypes.number.isRequired
}

export default NewsZfin;
