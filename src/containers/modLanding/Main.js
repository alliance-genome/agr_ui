import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import PropTypes from 'prop-types';
import style from './style.module.scss';
import {MODContent} from './content';
import About from "./About";
import Title from "./Title";
import News from "./News";
import Meetings from "./Meetings";
import Search from "./Search";
import Resources from "./Resources";
import VisitMod from "./VisitMod";
import FooterAlt from "./FooterAlt"

const MODLanding = ({modId}) => {

  const content = MODContent[modId];

  return (
    <div data-testid={'modlanding_div'} style={{backgroundColor: '#f5f5f5'}}>
      <HeadMetaTags title={content.modShortName} />
      <Title bannerStyle={content.bannerStyle} titleBarStyle={content.titleBarStyle} logoImgSrc={content.logoImgSrc}
             modFullName={content.modFullName}/>
      <div className={`container`}>
        <div className={`container ${style.containerExtra}`}>
          <div className="row">
            <div data-testid={'modlanding_middle'} className={`col-xl-7 col-lg-8 col-md-8 col-sm-12 ${style.noPadding}`}>
              <About htmlContent={content.about} sectionStyle={content.sectionStyle} />
              {content.hasNews && <News content={content} />}
              {content.hasMeetings && <Meetings content={content} />}
            </div>
            <div data-testid={'modlanding_right'} className={`col-xl-5 col-lg-4 col-md-4 col-sm-12 ${style.noPadding}`}>
              <Search links={content.search} sectionStyle={content.sectionStyle} />
              <Resources links={content.resources} sectionStyle={content.sectionStyle} />
              <VisitMod modVisitButtonText={content.modVisitButtonText} linkToMod={content.link}
                        sectionStyle={content.sectionStyle} />
            </div>
          </div>
        </div>
      </div>
      <div data-testid={'modlanding_footer'} >
        <FooterAlt  link={content.link}
                    links={content.footer}
                    note={content.footerNote}
                    footerStyle={content.footerStyle}
                    logoImgSrc={content.logoImgSrc}
                    titleBarStyle={content.titleBarStyle}
                    modShortName={content.modShortName}/>
      </div>
    </div>
  );
};

export default MODLanding;

MODLanding.propTypes = {
  modId: PropTypes.string.isRequired
}
