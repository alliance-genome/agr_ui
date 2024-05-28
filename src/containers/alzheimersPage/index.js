import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import PapersSection from './PapersSection';
import ResourcesSection from './ResourcesSection';
import DiseasePortalSection from './DiseasePortalSection';
import MembersSection from './MembersSection';


const AlzheimersPage = () => {
  return (
    <div>
      <HeadMetaTags title="Alzheimer's Disease Portal" />
      <DiseasePortalSection />

      <PapersSection />
      <ResourcesSection />

      <MembersSection />
    </div>
  );
};

export default AlzheimersPage;
