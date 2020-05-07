import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import SearchSection from './SearchSection';
import AboutSection from './AboutSection';
import MembersSection from './MembersSection';

const Homepage = () => {
  return (
    <div>
      <HeadMetaTags title='Home' />
      <SearchSection />
      <AboutSection />
      <MembersSection />
    </div>
  );
};

export default Homepage;
