import React from 'react';
import style from './style.module.scss';
import EntityButton from './EntityButton.jsx';
import { useEntityButtonCounts } from './useEntityButtonCounts.js';
import { data } from './portalData.js';

const DiseasePortalSection = ({ disease }) => {
  const url = `/api/disease/${disease.doid}/`;
  console.log(url);
  console.log(url + 'genes_counts');
  console.log(`${url}genes_counts`);
  const geneCount = useEntityButtonCounts(url + 'genes_counts');
  console.log(geneCount);
  const modelCount = useEntityButtonCounts(url + 'models_counts');
  const alleleCount = useEntityButtonCounts(url + 'alleles_counts');

  const pageTitle = disease.pageName === 'Disease' ? 'Disease Portals' : `${disease.pageName} Portal`;

  return (
    <section className={`${style.section} ${style.searchBackground} shadow`}>
      <div className={style.contentContainer}>
        <h1 className="display-4 font-weight-normal mb-1 text-center">{pageTitle}</h1>
        <h4 className="mb-5 text-center">Bringing the power of model systems to the biomedical community.</h4>
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
        <div className="d-flex justify-content-around flex-wrap">
          <EntityButton
            id="entity-models"
            to={`/disease/${disease.doid}#associated-models`}
            tooltip="View all associated models"
          >
            <div>{modelCount ? modelCount.toLocaleString() : ''}</div>
            Models
          </EntityButton>
          <EntityButton
            id="entity-genes"
            to={`/disease/${disease.doid}#associated-genes`}
            tooltip="View all associated genes"
          >
            <div>{geneCount ? geneCount.toLocaleString() : ''}</div>
            Genes
          </EntityButton>
          <EntityButton
            id="entity-alleles"
            to={`/disease/${disease.doid}#associated-alleles`}
            tooltip="View all associated alleles"
          >
            <div>{alleleCount ? alleleCount.toLocaleString() : ''}</div>
            Alleles
          </EntityButton>
          {/* <EntityButton id="entity-publications" to="">
            96,000
            <br />
            Publications
          </EntityButton> */}
          <EntityButton id="entity-species" to="/about-us" tooltip="View all associated species">
            9<br />
            Species
          </EntityButton>
        </div>
      </div>
    </section>
  );
};

export default DiseasePortalSection;
