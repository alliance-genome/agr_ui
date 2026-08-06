import React from 'react';
import { Link } from 'react-router-dom';
import { useEntityButtonCounts } from './useEntityButtonCounts.js';
import { data, portalsByGroup } from './portalData.js';
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
      {portalsByGroup().map((group) => (
        <React.Fragment key={group.name}>
          <li>{group.name}</li>
          <li style={{ listStyleType: 'none' }}>
            <ul>
              {group.portals.map((portal) => (
                <PortalListItem key={portal.slug} portalKey={portal.slug} label={portal.label} />
              ))}
            </ul>
          </li>
        </React.Fragment>
      ))}
    </ul>
  );
};

export default PortalListSection;
