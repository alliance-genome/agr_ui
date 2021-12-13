import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import PropTypes from 'prop-types';
import style from './style.scss';
import {MODContent} from './content';
import About from "./About";
import Title from "./Title";
import News from "./News";
import Resources from "./Resources"

const MODLanding = ({modId}) => {

  const content = MODContent[modId];

  return (
    <div style={{backgroundColor: '#f5f5f5'}}>
      <HeadMetaTags title={content.modShortName} />
      <Title bannerStyle={content.bannerStyle} titleBarStyle={content.titleBarStyle} logoImgSrc={content.logoImgSrc}
             modFullName={content.modFullName}/>
      <div className={`container`}>
        <div className={`container ${style.containerExtra}`}>
          <div className="row">
            <div className={`col-xl-8 col-lg-8 col-md-8 col-sm-12 ${style.noPadding}`}>
              <About htmlContent={content.about} modShortName={content.modShortName} linkToMod={content.link}
                                                 sectionStyle={content.sectionStyle} titleBarStyle={content.titleBarStyle} />
              {content.wordpressBaseURL && <News urlNewsMod={content.wordpressBaseURL}
                                                 fetchNewsCount={content.fetchNewsCount}
                                                 linkToNewsPage={content.linkToNewsPage}
                                                 sectionStyle={content.sectionStyle} />}
            </div>
            <div className={`col-xl-4 col-lg-4 col-md-4 col-sm-12 ${style.noPadding}`}>
              <Resources htmlContent={content.resources} sectionStyle={content.sectionStyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MODLanding;

MODLanding.propTypes = {
  modId: PropTypes.string.isRequired
}
