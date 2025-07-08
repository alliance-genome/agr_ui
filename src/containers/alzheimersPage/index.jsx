import React from 'react';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import PapersSection from './PapersSection.jsx';
import ResourcesSection from './ResourcesSection.jsx';
import DiseasePortalSection from './DiseasePortalSection.jsx';
import MembersSection from '../../components/MembersSection.jsx';
import { HELP_EMAIL } from '../../constants';

const AlzheimersPage = () => {
  return (
    <div>
      <HeadMetaTags title="Alzheimer's Disease Portal" />
      <DiseasePortalSection />
      <PapersSection />
      <ResourcesSection />

      <div>
        <h4 className="mt-4 text-center">
          Need Help? Contact Us: &nbsp;<a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a>
        </h4>
      </div>

      <MembersSection />
    </div>
  );
};

export default AlzheimersPage;
