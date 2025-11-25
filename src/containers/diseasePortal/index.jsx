import React from 'react';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import PapersSection from './PapersSection.jsx';
import PortalListSection from './PortalListSection.jsx';
import ResourcesSection from './ResourcesSection.jsx';
import DiseasePortalSection from './DiseasePortalSection.jsx';
import MembersSection from '../../components/MembersSection.jsx';
import { HELP_EMAIL } from '../../constants';
import { useParams } from 'react-router-dom';
import { data } from './portalData.js';

const DiseasePortalPage = () => {
  const { name: dname } = useParams();
  const diseaseData = data[dname] || data['human'];
  return (
    <div>
      <HeadMetaTags title={`${diseaseData.pageName} Portal`} />
      <DiseasePortalSection disease={diseaseData} />
      {dname ? <PapersSection disease={diseaseData} /> : <PortalListSection />}
      <ResourcesSection disease={diseaseData} />
      <div>
        <h4 className="mt-4 text-center">
          Need Help? Contact Us: &nbsp;<a href={`mailto:${HELP_EMAIL}`}>{HELP_EMAIL}</a>
        </h4>
      </div>
      <MembersSection />
    </div>
  );
};

export default DiseasePortalPage;
