import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import PropTypes from 'prop-types';
import style from './style.scss';
import {MODContent} from './content';
import About from "./About";
import LinkToMOD from "./LinkToMOD";
import Title from "./Title";
import News from "./News"; 
 
const MODLanding = ({modId}) => {

  const content = MODContent[modId];
  const newsURL= MODContent[modId].wordpressBaseURL;
  const fetchNewsCount= MODContent[modId].fetchNewsCount;
   
  return (
    <div>
      <HeadMetaTags title={modId.toUpperCase()} />
      <div>
        <Title bannerStyle={content.bannerStyle} titleBarStyle={content.titleBarStyle} logoImgSrc={content.logoImgSrc}
               modFullName={content.modFullName}/>
        <About htmlContent={content.about} modShortName={content.modShortName} linkToMod={content.link} />
        {newsURL && <News urlNewsMod={newsURL} fetchNewsCount={fetchNewsCount} modShortName={content.modShortName} linkToMod={content.link} />}
        <div className='container'>
          <div className="row">
            <div className="col-sm-4">
              <section className={style.section}>
                <div className={`${style.contentContainer}`}>

                </div>
              </section>
            </div>
            <div className="col-sm-4">
              <section className={style.section}>
                <div className={`${style.contentContainer}`}>
                </div>
              </section>
            </div>
            <div className="col-sm-4">
              <section className={style.section}>
                <div className={`${style.contentContainer}`}>
                </div>
              </section>
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
