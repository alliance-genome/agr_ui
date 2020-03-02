import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';

import style from './style.scss';
import {SearchBarComponent} from '../layout/searchBar';
import SearchExample from './SearchExample';

const Homepage = () => {
  return (
    <div>
      <HeadMetaTags title='Home' />

      <section className={style.searchSection}>
        <div className={style.searchSectionInner}>
          <h1 className='display-4 mb-4 text-center'>Big Call to Action</h1>
          <h3 className='mb-4 text-center'>A smaller subheading with more text about whatever</h3>
          <div className={style.searchBarContainer}>
            <SearchBarComponent autoFocus />
          </div>
          <ul className={style.searchExampleList}>
            <li>Examples</li>
            <li><SearchExample term='RPB7' /></li>
            <li><SearchExample term='kinase' /></li>
            <li><SearchExample term='asthma' /></li>
            <li><SearchExample term='liver' /></li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
