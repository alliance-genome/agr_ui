import React from 'react';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import style from './style.module.scss';
import {MODContent} from './content.jsx';
import About from "./About.jsx";
import Title from "./Title.jsx";
import News from "./News.jsx";
import Meetings from "./Meetings.jsx";
import Search from "./Search.jsx";
import Resources from "./Resources.jsx";
import VisitMod from "./VisitMod.jsx";
import FooterAlt from "./FooterAlt.jsx"
import {useParams} from "react-router-dom";

const MODLanding = () => {

  const { id: modId } = useParams();
  const content = MODContent[modId];

  return (
    <div data-testid={'modlanding_div'} style={{backgroundColor: '#f5f5f5'}}>
      <HeadMetaTags title={content.modShortName} />
      <Title bannerStyle={content.bannerStyle} titleBarStyle={content.titleBarStyle} logoImgSrc={content.logoImgSrc}
             modFullName={content.modFullName}/>
      <div className={`container`}>
        <div className={`container ${style.containerExtra}`}>
          <div className="row">
            <div data-testid={'modlanding_middle'} className={`col-xl-8 col-lg-8 col-md-8 col-sm-12 ${style.noPadding}`}>
              <About htmlContent={content.about} sectionStyle={content.sectionStyle} />
              {content.hasNews && <News content={content} />}
              {content.hasMeetings && <Meetings content={content} />}
            </div>
            <div data-testid={'modlanding_right'} className={`col-xl-4 col-lg-4 col-md-4 col-sm-12 ${style.noPadding}`}>
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

MODLanding.propTypes = {}
