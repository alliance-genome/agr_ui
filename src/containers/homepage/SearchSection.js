import React from 'react';
import style from './style.scss';
import {SearchBarComponent} from '../layout/searchBar';
import SearchExample from './SearchExample';
import ActionButton from './ActionButton';

const SearchSection = () => {
  return (
    <section className={`${style.section} ${style.searchBackground}`}>
      <div className={style.contentContainer}>
        <h1 className='display-4 mb-4 text-center'>Big Call to Action</h1>
        <h3 className='mb-4 text-center'>A smaller subheading with more text about whatever</h3>
        <div className={style.searchBarContainer}>
          <SearchBarComponent autoFocus placeholder='Search' />
        </div>
        <ul className={style.searchExampleList}>
          <li>Examples:</li>
          <li><SearchExample term='RPB7' /></li>
          <li><SearchExample term='kinase' /></li>
          <li><SearchExample term='asthma' /></li>
          <li><SearchExample term='liver' /></li>
        </ul>
        <div className='d-flex justify-content-around flex-wrap'>
          <ActionButton icon='fa-download' to='/downloads'>Download Data</ActionButton>
          <ActionButton icon='fa-code' to='/api/swagger-ui'>Browse APIs</ActionButton>
          <ActionButton icon='fa-book' to='/publications'>View Publications</ActionButton>
          <ActionButton icon='fa-lightbulb-o' to='/tutorials'>Learn More</ActionButton>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
