import React from 'react';
import style from './style.module.scss';
import PropTypes from 'prop-types';

const About = ({ htmlContent, sectionStyle }) => {
  return (
    <div className={`container ${style.containerExtra}`}>
      <div data-testid="about-inner-container" className={`${style.section} ${sectionStyle}`}>
        <h2 data-testid="header" className={style.sectionTitle}>
          About
        </h2>
        <div data-testid="html-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    </div>
  );
};

About.propTypes = {
  htmlContent: PropTypes.string.isRequired,
};

export default About;
