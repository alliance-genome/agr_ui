import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import SearchSection from './SearchSection';
import AboutSection from './AboutSection';

const Homepage = () => {
  return (
    <div>
      <HeadMetaTags title='Home' />
      <SearchSection />
      <AboutSection />
    </div>
  );
};

export default Homepage;
