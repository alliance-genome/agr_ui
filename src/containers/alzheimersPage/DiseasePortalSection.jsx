import React from 'react';
import style from './style.module.scss';
// import {SearchBarComponent} from '../layout/searchBar';
// import SearchExample from './SearchExample';
import EntityButton from './EntityButton.jsx';
// import {Link} from 'react-router-dom';

const DiseasePortalSection = () => {
  return (
    <section className={`${style.section} ${style.searchBackground} shadow`}>
      <div className={style.contentContainer}>
        <h1 className='display-4 font-weight-normal mb-1 text-center'>Alzheimer's Disease Portal</h1>
        <h4 className='mb-5 text-center'>Bringing the power of model systems to the biomedical community.</h4>
        {/* <div className={style.searchBarContainer}>
          <SearchBarComponent autoFocus placeholder='Search for genes, alleles, disease models, and more' />
        </div>
        <ul className={`${style.searchExampleList} mb-4`}>
          <li>Examples:</li>
          <li><SearchExample term='RPB7' /></li>
          <li><SearchExample term='kinase' /></li>
          <li><SearchExample term='asthma' /></li>
          <li><SearchExample term='liver' /></li>
          <li><Link to='/help#how'>More...</Link></li>
        </ul> */}
        <div className='d-flex justify-content-around flex-wrap'>
          <EntityButton
            id='entity-models'
            to='/disease/DOID:10652#associated-models'
            tooltip='View all associated models'
          >
            213<br />Models
          </EntityButton>
          <EntityButton
            id='entity-genes'
            to='/disease/DOID:10652#associated-genes'
            tooltip='View all associated genes'
          >
            2,939<br />Genes
          </EntityButton>
          <EntityButton
            id='entity-alleles'
            to='/disease/DOID:10652#associated-alleles'
            tooltip='View all associated alleles'
          >
            268<br />Alleles
          </EntityButton>
          <EntityButton
            id='entity-publications'
            to='/disease-portal/alzheimers-disease'
          >
            96,000<br />Publications
          </EntityButton>
          <EntityButton
            id='entity-species'
            to='/about-us'
            tooltip='View all associated species'
          >
            9<br />Species
          </EntityButton>
        </div>
      </div>
    </section>
  );
};

export default DiseasePortalSection;
