import React from 'react';
import HeadMetaTags from '../../components/headMetaTags';
import PapersSection from './PapersSection';
import ResourcesSection from './ResourcesSection';
import DiseasePortalSection from './DiseasePortalSection';
import MembersSection from '../../components/MembersSection';
import { HELP_EMAIL } from '../../constants';

// Delete this comment after F2F presetnations

const AlzheimersPage = () => {
  return (
    <div>
      <HeadMetaTags title="Alzheimer's Disease Portal" />
      <DiseasePortalSection />
      <PapersSection />
      <ResourcesSection />

      <div>
        <h4 className='mt-4 text-center'>Need Help? Contact Us: &nbsp;<a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a></h4>
      </div>

      <MembersSection />
    </div>
  );
};

export default AlzheimersPage;
