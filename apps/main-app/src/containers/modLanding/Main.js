import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import PropTypes from 'prop-types';
import style from './style.scss';
import {MODContent} from './content';
import About from "./About";
import Title from "./Title";
import News from "./News";
import Resources from "./Resources";
import FooterAlt from "./FooterAlt"

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
              <About htmlContent={content.about} modVisitButtonText={content.modVisitButtonText} linkToMod={content.link}
                                                 sectionStyle={content.sectionStyle} titleBarStyle={content.titleBarStyle} />
              {content.wordpressBaseURL && <News urlNewsMod={content.wordpressBaseURL}
                                                 fetchNewsCount={content.fetchNewsCount}
                                                 linkToNewsPage={content.linkToNewsPage}
                                                 sectionStyle={content.sectionStyle} />}
             { content.newsURL &&
              <div className={`container ${style.containerExtra}`}>
               <div className={`${style.section} ${content.sectionStyle}`}>
                <h3 className={style.externalNews} > <a href={content.newsURL}>Click here for the latest news from {content.modShortName}  </a></h3>
               </div>
              </div>}
            </div>

            <div className={`col-xl-4 col-lg-4 col-md-4 col-sm-12 ${style.noPadding}`}>
              <Resources htmlContent={content.resources} sectionStyle={content.sectionStyle} />
            </div>
          </div>
        </div>
      </div>
      <FooterAlt links={content.footer} note={content.footerNote} footerStyle={content.footerStyle} modShortName={content.modShortName} bob={content}/>
    </div>
  );
};

export default MODLanding;

MODLanding.propTypes = {
  modId: PropTypes.string.isRequired
}
