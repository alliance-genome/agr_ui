import React from 'react';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import PapersSection from './PapersSection.jsx';
import ResourcesSection from './ResourcesSection.jsx';
import DiseasePortalSection from './DiseasePortalSection.jsx';
import MembersSection from '../../components/MembersSection.jsx';
import { HELP_EMAIL } from '../../constants';
import { useParams } from 'react-router-dom';
import { data } from './portalData.js';
import style from './style.module.scss';

const DiseasePortalPage = () => {
  const { name: dname } = useParams();
  console.log(dname);
  const diseaseData = dname ? data[dname] : data['human'];
  console.log(diseaseData.doid);
  return (
    <div>
      <HeadMetaTags title={`${diseaseData.pageName} Portal`} />
      <DiseasePortalSection disease={diseaseData} />
      {dname ? (
        <PapersSection disease={diseaseData} />
      ) : (
        <section className={style.section}>
          <div className={style.contentContainer}>
            <div className="row">
              <div className="col-lg-12">
                <h2>Alliance Disease Portals</h2>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* add logic 'human ? <HierarchySection /> : <PapersSection />' */}
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
