import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';

import style from './style.scss';
import {SearchBarComponent} from '../layout/searchBar';

const Homepage = () => {
  return (
    <div>
      <HeadMetaTags title='Home' />

      <section className={style.searchSection}>
        <h1 className='display-4 mb-4'>Big Call to Action</h1>
        <h3 className='mb-4'>A smaller subheading with more text about whatever</h3>
        <div className={style.searchBarContainer}>
          <SearchBarComponent/>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
