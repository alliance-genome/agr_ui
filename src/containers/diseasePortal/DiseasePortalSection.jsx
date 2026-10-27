import React from 'react';
import style from './style.module.scss';
import EntityButton from './EntityButton.jsx';
import { useEntityButtonCounts } from './useEntityButtonCounts.js';
import { isRootPortal } from './portalData.js';

// Hidden on every portal page pending a decision on what the count should mean
// per portal (KANBAN-1492). Flip to true to restore the Alliance-wide pill.
const SHOW_DISEASE_COUNT = false;

const DiseasePortalSection = ({ disease }) => {
  const url = `/api/disease/${disease.doid}/`;
  const isRoot = isRootPortal(disease);
  const diseaseCount = useEntityButtonCounts(SHOW_DISEASE_COUNT ? '/api/disease/annotated-count' : null);
  const geneCount = useEntityButtonCounts(url + 'genes_counts');
  const alleleCount = useEntityButtonCounts(url + 'alleles_counts');
  const modelCount = useEntityButtonCounts(url + 'models_counts');

  const pageTitle = isRoot
    ? 'Disease Portals'
    : // <a href={`/disease/${disease.doid}`}>{`${disease.pageName} Portal`}</a>
      `${disease.pageName} Portal`;
  const diseasesEntityButton = SHOW_DISEASE_COUNT ? (
    <EntityButton id="entity-diseases" to="/search?q=&category=disease_search_result" tooltip="View all diseases">
      <div>{diseaseCount != null && diseaseCount.toLocaleString()}</div>
      Diseases
    </EntityButton>
  ) : (
    ''
  );
  // Whole-Alliance figure, shown on the root portal only.
  const speciesEntityButton = isRoot ? (
    <EntityButton id="entity-species" to="/about-us" tooltip="About the Alliance">
      9<br />
      Species
    </EntityButton>
  ) : (
    ''
  );

  return (
    <section className={`${style.section} ${style.searchBackground} shadow`}>
      <div className={style.contentContainer}>
        <h1 className="display-4 font-weight-normal mb-1 text-center">{pageTitle}</h1>
        <h4 className="mb-5 text-center">Bringing the power of model systems to the biomedical community</h4>
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
          {diseasesEntityButton}
          {/* Gene, Allele, Model order matches the disease pages and the ontology browser (KANBAN-1503). */}
          <EntityButton
            id="entity-genes"
            to={`/disease/${disease.doid}#associated-genes`}
            tooltip="View all associated genes"
          >
            <div>{geneCount != null && geneCount.toLocaleString()}</div>
            Genes
          </EntityButton>
          <EntityButton
            id="entity-alleles"
            to={`/disease/${disease.doid}#associated-alleles`}
            tooltip="View all associated alleles"
          >
            <div>{alleleCount != null && alleleCount.toLocaleString()}</div>
            Alleles
          </EntityButton>
          <EntityButton
            id="entity-models"
            to={`/disease/${disease.doid}#associated-models`}
            tooltip="View all associated models"
          >
            <div>{modelCount != null && modelCount.toLocaleString()}</div>
            Models
          </EntityButton>
          {/* <EntityButton id="entity-publications" to="">
            96,000
            <br />
            Publications
          </EntityButton> */}
          {speciesEntityButton}
        </div>
      </div>
    </section>
  );
};

export default DiseasePortalSection;
