import React from 'react';
import style from './style.scss';
import PropTypes from "prop-types";
import WordpressNews from "./wordpressNews"

const News = ({content}) => {
  console.log('content');
  console.log(content);
  return (
    <div className={`container ${style.containerExtra}`}>
      <div className={`${style.section} ${content.sectionStyle}`}>
        <h2 className={style.sectionTitle}>News</h2>
        {(() => {
          if (content.wordpressNewsBaseURL) { 
            return (<WordpressNews urlNewsMod={content.wordpressNewsBaseURL} fetchNewsCount={content.fetchNewsCount}
                                   linkToNewsPage={content.linkToNewsPage} />); }
          else if (content.newsURL) { 
            return (<h5 className={style.externalNews} ><a href={content.newsURL}>Click here for the latest news from {content.modShortName}</a></h5>); }
          return (<div>No News</div>);
        })()}
      </div>
    </div>
  );
}

News.propTypes = {
  content: PropTypes.object.isRequired
}

export default News;
