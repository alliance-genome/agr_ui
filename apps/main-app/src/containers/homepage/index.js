import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import SearchSection from './SearchSection';
import AboutSection from './AboutSection';
import MembersSection from './MembersSection';
import style from './style.scss';
import CovidInfoLink from '../../components/CovidInfoLink';
import DavidShawUserSurvey from '../../components/DavidShawUserSurvey';

const Homepage = () => {
  return (
    <div>
      <HeadMetaTags title='Home' />
      <SearchSection />

      <section className={style.section}>
        <div className={`${style.contentContainer}`}>
          <DavidShawUserSurvey />
        </div>

        <div><br/><br/></div>

        <div className={`${style.contentContainer}`}>
          <CovidInfoLink />
        </div>
      </section>

      <AboutSection />
      <MembersSection />
    </div>
  );
};

export default Homepage;
