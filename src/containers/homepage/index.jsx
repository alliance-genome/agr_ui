import React from 'react';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import SearchSection from './SearchSection.jsx';
import AboutSection from './AboutSection.jsx';
import MembersSection from '../../components/MembersSection.jsx';
import style from './style.module.scss';
import WordpressInject from '../wordpress/wordpressInject.jsx';

const Homepage = () => {
  return (
    <div>
      <HeadMetaTags title="Home" />
      <SearchSection />

      <section className={style.section}>
        <div className={`${style.contentContainer}`}>
          <WordpressInject slug="agr-inject-homepage" />
        </div>
      </section>

      <AboutSection />
      <MembersSection />
    </div>
  );
};

export default Homepage;
