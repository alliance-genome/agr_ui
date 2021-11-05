import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import AboutSection from './AboutSection';
import style from './style.scss';

const MODLanding = () => {
  return (
    <div>
      <HeadMetaTags title='Landing page' />

      <section className={style.section}>
        <div className={`${style.contentContainer}`}>
        </div>
      </section>

      <AboutSection />
    </div>
  );
};

export default MODLanding;
