import React from 'react';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import PapersSection from './PapersSection.jsx';
import PortalListSection from './PortalListSection.jsx';
import ResourcesSection from './ResourcesSection.jsx';
import SummarySection from './SummarySection.jsx';
import DiseasePortalSection from './DiseasePortalSection.jsx';
import MembersSection from '../../components/MembersSection.jsx';
import NotFound from '../../components/notFound.jsx';
import Subsection from '../../components/subsection.jsx';
import { DataPage, PageNav, PageData } from '../../components/dataPage';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import { Link, useParams } from 'react-router-dom';
import { data } from './portalData.js';
import style from './style.module.scss';

const SUMMARY = 'Summary';
const COMMUNITY_RESOURCES = 'Community Resources';
const RECENT_PAPERS = 'Recent Alliance Papers';
const MEMBERS = 'Members';

const SECTIONS = [{ name: SUMMARY }, { name: RECENT_PAPERS }, { name: COMMUNITY_RESOURCES }];

const DiseasePortalPage = () => {
  const { name: dname } = useParams();
  const diseaseData = dname ? data[dname] : data['human'];

  // Hook must run unconditionally on every render (Rules of Hooks): both the
  // list (/disease-portal) and detail (/disease-portal/:name) routes render
  // this same component, so React reuses the fiber across that navigation.
  // Passing a null url when there's no doid makes the query a no-op.
  const { data: diseaseApiData } = usePageLoadingQuery(diseaseData?.doid ? `/api/disease/${diseaseData.doid}` : null);

  if (dname && !diseaseData) {
    return <NotFound />;
  }

  if (!dname) {
    return (
      <div>
        <HeadMetaTags title={`${diseaseData.pageName} Portal`} />
        <DiseasePortalSection disease={diseaseData} />
        <section className={style.section}>
          <div className={style.contentContainer}>
            <h2>Disease Portals</h2>
            <PortalListSection />
          </div>
        </section>
        <section className={style.section}>
          <div className={style.contentContainer}>
            <h2>Community Resources</h2>
            <ResourcesSection disease={diseaseData} />
          </div>
        </section>
        <MembersSection />
      </div>
    );
  }

  const portalTitle = diseaseData.pageName;

  return (
    <div>
      <HeadMetaTags title={`${diseaseData.pageName} Portal`} />
      <DiseasePortalSection disease={diseaseData} />
      <DataPage>
        <PageNav sections={SECTIONS}>
          <PageNavEntity entityName={portalTitle}>
            <Link to={`/disease/${diseaseData.doid}`}>{diseaseData.doid}</Link>
          </PageNavEntity>
        </PageNav>
        <PageData>
          <Subsection title={SUMMARY}>
            <SummarySection disease={diseaseApiData} />
          </Subsection>
          <Subsection title={RECENT_PAPERS}>
            <PapersSection diseaseName={diseaseApiData?.doTerm?.name} />
          </Subsection>
          <Subsection title={COMMUNITY_RESOURCES}>
            <ResourcesSection disease={diseaseData} />
          </Subsection>
          <div className={style.membersFooter}>
            <Subsection hideTitle title={MEMBERS}>
              <MembersSection />
            </Subsection>
          </div>
        </PageData>
      </DataPage>
    </div>
  );
};

export default DiseasePortalPage;
