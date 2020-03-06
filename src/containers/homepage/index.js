import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import SearchSection from './SearchSection';

const Homepage = () => {
  return (
    <div>
      <HeadMetaTags title='Home' />
      <SearchSection />
    </div>
  );
};

export default Homepage;
