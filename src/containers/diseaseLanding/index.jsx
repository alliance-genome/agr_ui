import React from 'react';
import style from '../alzheimersPage/style.module.scss';
import EntityButton from '../alzheimersPage/EntityButton.jsx';
import { useEntityButtonCounts } from '../alzheimersPage/useEntityButtonCounts.js';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import MembersSection from '../../components/MembersSection.jsx';
import { HELP_EMAIL } from '../../constants';

const DiseasePortal = () => {
  const url = '/api/disease/DOID:4/';
  const geneCount = useEntityButtonCounts(url + 'genes_counts');
  const modelCount = useEntityButtonCounts(url + 'models_counts');
  const alleleCount = useEntityButtonCounts(url + 'alleles_counts');
  return (
    <div>
      <HeadMetaTags title="Alzheimer's Disease Portal" />

      <section className={`${style.section} ${style.searchBackground} shadow`}>
        <div className={style.contentContainer}>
          <h1 className="display-4 font-weight-normal mb-1 text-center">Human Disease Portals</h1>
          <h4 className="mb-5 text-center">Bringing the power of model systems to the biomedical community.</h4>
          <div className="d-flex justify-content-around flex-wrap">
            <EntityButton
              id="entity-models"
              to="/disease/DOID:10652#associated-models"
              tooltip="View all associated models"
            >
              <div>{modelCount ? modelCount.toLocaleString() : ''}</div>
              Models
            </EntityButton>
            <EntityButton
              id="entity-genes"
              to="/disease/DOID:10652#associated-genes"
              tooltip="View all associated genes"
            >
              <div>{geneCount ? geneCount.toLocaleString() : ''}</div>
              Genes
            </EntityButton>
            <EntityButton
              id="entity-alleles"
              to="/disease/DOID:10652#associated-alleles"
              tooltip="View all associated alleles"
            >
              <div>{alleleCount ? alleleCount.toLocaleString() : ''}</div>
              Alleles
            </EntityButton>
            <EntityButton id="entity-species" to="/about-us" tooltip="View all associated species">
              9<br />
              Species
            </EntityButton>
            <EntityButton id="entity-publications" to="/disease-portal/alzheimers-disease">
              96,000
              <br />
              Publications
            </EntityButton>
          </div>
        </div>
      </section>
      <div>
        <h4 className="mt-4 text-center">
          Need Help? Contact Us: &nbsp;<a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a>
        </h4>
      </div>

      <MembersSection />
    </div>
  );
};

export default DiseasePortal;
