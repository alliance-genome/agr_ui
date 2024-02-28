import React from 'react';
import style from './style.module.scss';
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
          <ActionButton
            icon='download'
            size='2x'
            id='action-download'
            to='/downloads'
            tooltip='Access downloadable bulk data files by species or combined for a variety of data types'
          >
            Download Data
          </ActionButton>
          <ActionButton
            icon='code'
            size='2x'
            id='action-api'
            to='/swagger-ui'
            tooltip='Read documentation for accessing Alliance data programmatically via REST APIs'
          >
            Browse APIs
          </ActionButton>
          <ActionButton
            icon='book-open'
            size='2x'
            id='action-pubs'
            to='/publications'
            tooltip='See publications about the Alliance written by Alliance members'
          >
            View Publications
          </ActionButton>
          <ActionButton
            icon='lightbulb'
            size='2x'
            id='action-tutorial'
            to='/tutorials'
            tooltip='Dive deeper into using the Alliance with video and text-based tutorials'
          >
            Learn More
          </ActionButton>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
