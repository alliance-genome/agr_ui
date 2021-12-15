import React from 'react';
import style from './style.scss';
import PropTypes from 'prop-types';
import LinkToMOD from './LinkToMOD';

const About = ({htmlContent, modVisitButtonText, linkToMod, sectionStyle, titleBarStyle}) => {
  return (
    <div className={`container ${style.containerExtra}`}>
      <div className={`${style.section} ${sectionStyle}`}>
        <h2 className={style.sectionTitle}>About</h2>
        <div dangerouslySetInnerHTML={{__html: htmlContent}}/>
        <LinkToMOD modName={modVisitButtonText} titleBarStyle={titleBarStyle} linkAddress={linkToMod}/>
      </div>
    </div>
  );
}

About.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  modVisitButtonText: PropTypes.string.isRequired,
  linkToMod: PropTypes.string.isRequired
}

export default About;
