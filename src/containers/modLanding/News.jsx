import React from 'react';
import style from './style.module.scss';
import PropTypes from "prop-types";
import WordpressNews from "./wordpressNews.jsx"
import NewsFlybase from "./NewsFlybase.jsx"
import NewsZfin from "./NewsZfin.jsx"
import ExternalLink from '../../components/ExternalLink.jsx';

const News = ({content}) => {
  return (
    <div className={`container ${style.containerExtra}`}>
      <div data-testid={'news_div'} className={`${style.section} ${content.sectionStyle}`}>
        <h2 data-testid={'news_header'} className={style.sectionTitle}>News</h2>
        {(() => {
          if (content.wordpressNewsBaseURL) {
            return (<WordpressNews urlNewsMod={content.wordpressNewsBaseURL} fetchNewsCount={content.fetchNewsCount}
                                   linkToNewsPage={content.linkToNewsPage} />); }
          else if (content.zfinNewsAPI) {
            return (<NewsZfin urlNewsMod={content.zfinNewsAPI} fetchNewsCount={content.fetchNewsCount}
                              linkToNewsPage={content.linkToNewsPage} />); }
          else if (content.flybaseNewsAPI) {
            return (<NewsFlybase urlNewsMod={content.flybaseNewsAPI} fetchNewsCount={content.fetchNewsCount}
                                 linkToNewsPage={content.linkToNewsPage} />); }
          else if (content.rgdNewsAPI) {
            // rgd modeled their api format after flybase, so uses same
            return (<NewsFlybase urlNewsMod={content.rgdNewsAPI} fetchNewsCount={content.fetchNewsCount}
                                 linkToNewsPage={content.linkToNewsPage} />); }
          else if (content.newsURL) {
            return (<h5 data-testid={'news_link_header'} className={style.externalNews} >
                      <ExternalLink href={content.newsURL} data-testid={'more_news_link'}>
                        Read the latest news from {content.modShortName}</ExternalLink>
                    </h5>); }
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
