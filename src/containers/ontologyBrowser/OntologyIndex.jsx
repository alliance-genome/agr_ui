import React from 'react';
import { Link } from 'react-router-dom';
import { DataPage, PageData, PageHeader, PageNav } from '../../components/dataPage';
import HeadMetaTags from '../../components/headMetaTags.jsx';

const ONTOLOGIES = [
  {
    name: 'Disease Ontology',
    description: 'Standardized ontology for human disease.',
    path: '/ontology-browser/disease',
  },
];

const OntologyIndex = () => (
  <DataPage>
    <HeadMetaTags title="Ontology Browser" />
    <PageNav sections={[]} />
    <PageData>
      <PageHeader>Ontology Browser</PageHeader>
      <ul className="list-unstyled">
        {ONTOLOGIES.map(({ name, description, path }) => (
          <li className="mb-3" key={path}>
            <Link to={path}><strong>{name}</strong></Link>
            {description && <span className="text-muted ml-2">{description}</span>}
          </li>
        ))}
      </ul>
    </PageData>
  </DataPage>
);

export default OntologyIndex;
