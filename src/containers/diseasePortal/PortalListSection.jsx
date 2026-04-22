import React from 'react';
import { Link } from 'react-router-dom';

const PortalListSection = () => {
  return (
    <ul style={{ fontSize: '1.2rem' }}>
      <li>Disease of metabolism</li>
      <li style={{ listStyleType: 'none' }}>
        <ul>
          <li>
            <Link to={'/disease-portal/diabetes-mellitus'}>diabetes mellitus</Link>
          </li>
        </ul>
      </li>
      <li>Neurodegenerative disease</li>
      <li style={{ listStyleType: 'none' }}>
        <ul>
          <li>
            <Link to={'/disease-portal/alzheimers-disease'}>Alzheimer&#39;s disease</Link>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default PortalListSection;
