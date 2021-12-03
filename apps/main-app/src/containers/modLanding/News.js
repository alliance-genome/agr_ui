import React from 'react';
import style from './style.scss';
import PropTypes from "prop-types";
import LinkToMOD from "./LinkToMOD";
import WordpressPostListMod from "./../wordpress/wordpressPostListMod"

const News = ({urlNewsMod, fetchNewsCount, modShortName, linkToMod}) => {
  return (
    <div className='container'>
      <div className={style.section}>
        <h2 className={style.sectionTitle}>News</h2>
        <WordpressPostListMod urlNewsMod={urlNewsMod} fetchNewsCount={fetchNewsCount} />
        <LinkToMOD modName={modShortName} linkAddress={linkToMod}/>
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