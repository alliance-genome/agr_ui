import React from 'react';
import { Link } from 'react-router-dom';
import { useEntityButtonCounts } from './useEntityButtonCounts.js';
import { data } from './portalData.js';
import style from './style.module.scss';

const PortalListItem = ({ portalKey, label }) => {
  const disease = data[portalKey];
  const url = `/api/disease/${disease.doid}/`;
  const modelCount = useEntityButtonCounts(url + 'models_counts');
  const geneCount = useEntityButtonCounts(url + 'genes_counts');
  const alleleCount = useEntityButtonCounts(url + 'alleles_counts');

  return (
    <li>
      <Link to={`/disease-portal/${portalKey}`}>{label}</Link>
      <span className={style.portalCounts}>
        {modelCount != null && <span>{modelCount.toLocaleString()} models</span>}
        {geneCount != null && <span>{geneCount.toLocaleString()} genes</span>}
        {alleleCount != null && <span>{alleleCount.toLocaleString()} alleles</span>}
      </span>
    </li>
  );
};

const PortalListSection = () => {
  return (
    <ul style={{ fontSize: '1.2rem' }}>
      <li>Disease of metabolism</li>
      <li style={{ listStyleType: 'none' }}>
        <ul>
          <PortalListItem portalKey="diabetes-mellitus" label="diabetes mellitus" />
        </ul>
      </li>
      <li>Neurodegenerative disease</li>
      <li style={{ listStyleType: 'none' }}>
        <ul>
          <PortalListItem portalKey="alzheimers-disease" label="Alzheimer&#39;s disease" />
          <PortalListItem portalKey="parkinsons-disease" label="Parkinson&#39;s disease" />
        </ul>
      </li>
    </ul>
  );
};

export default PortalListSection;
