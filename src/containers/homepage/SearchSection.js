import React from 'react';
import style from './style.scss';
import {SearchBarComponent} from '../layout/searchBar';
import SearchExample from './SearchExample';
import ActionButton from './ActionButton';
import {Link} from 'react-router-dom';

const SearchSection = () => {
  return (
    <section className={`${style.section} ${style.searchBackground} shadow`}>
      <div className={style.contentContainer}>
        <h1 className='display-4 font-weight-normal mb-1 text-center'>Search Across Species</h1>
        <h4 className='mb-5 text-center'>Explore model organism and human comparative genomics</h4>
        <div className={style.searchBarContainer}>
          <SearchBarComponent autoFocus placeholder='Search for genes, alleles, disease models, and more' />
        </div>
        <ul className={`${style.searchExampleList} mb-4`}>
          <li>Examples:</li>
          <li><SearchExample term='RPB7' /></li>
          <li><SearchExample term='kinase' /></li>
          <li><SearchExample term='asthma' /></li>
          <li><SearchExample term='liver' /></li>
          <li><Link to='/help#how'>More...</Link></li>
        </ul>
        <div className='d-flex justify-content-around flex-wrap'>
          <ActionButton icon='fa-download' to='/downloads'>Download Data</ActionButton>
          <ActionButton icon='fa-code' to='/api/swagger-ui'>Browse APIs</ActionButton>
          <ActionButton icon='fa-book' to='/publications'>View Publications <small>about the Alliance</small></ActionButton>
          <ActionButton icon='fa-lightbulb-o' to='/tutorials'>Learn More <small>about the Alliance</small></ActionButton>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
