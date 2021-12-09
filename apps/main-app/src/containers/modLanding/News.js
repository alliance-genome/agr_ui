import React from 'react';
import style from './style.scss';
import PropTypes from "prop-types";
import WordpressNews from "./wordpressNews"

const News = ({urlNewsMod, fetchNewsCount, linkToNewsPage, sectionStyle}) => {
  return (
    <div className={`container ${style.containerExtra}`}>
      <div className={`${style.section} ${sectionStyle}`}>
        <h2 className={style.sectionTitle}>News</h2>
        <WordpressNews urlNewsMod={urlNewsMod} fetchNewsCount={fetchNewsCount} linkToNewsPage={linkToNewsPage} />
      </div>
    </div>
  );
}

News.propTypes = {
  urlNewsMod: PropTypes.string.isRequired,
  fetchNewsCount: PropTypes.number.isRequired,
  linkToNewsPage: PropTypes.string.isRequired
}

export default News;
