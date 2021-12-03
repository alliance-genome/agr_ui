import React from 'react';
import style from './style.scss';
import PropTypes from "prop-types";
import WordpressNews from "./wordpressNews"

const News = ({urlNewsMod, fetchNewsCount, modShortName, linkToMod}) => {
  return (
    <div className='container'>
      <div className={style.section}>
        <h2 className={style.sectionTitle}>News</h2>
        <WordpressNews urlNewsMod={urlNewsMod} fetchNewsCount={fetchNewsCount} />
      </div>
    </div>
  );
}

News.propTypes = {
  //htmlContent: PropTypes.string.isRequired,
  modShortName: PropTypes.string.isRequired,
  linkToMod: PropTypes.string.isRequired
}

export default News;
