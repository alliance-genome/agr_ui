import React from 'react';
import style from './style.scss';
import PropTypes from 'prop-types';
import LinkToMOD from './LinkToMOD';

const About = ({htmlContent, modShortName, linkToMod}) => {
  return (
    <div className='container'>
      <div className={style.section}>
        <h2 className={style.sectionTitle}>About</h2>
        <div dangerouslySetInnerHTML={{__html: htmlContent}}/>
        <LinkToMOD modName={modShortName} linkAddress={linkToMod}/>
      </div>
    </div>
  );
}

About.propTypes = {
  htmlContent: PropTypes.string.isRequired,
  modShortName: PropTypes.string.isRequired,
  linkToMod: PropTypes.string.isRequired
}

export default About;
