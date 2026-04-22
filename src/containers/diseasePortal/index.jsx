import React from 'react';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import PapersSection from './PapersSection.jsx';
import PortalListSection from './PortalListSection.jsx';
import ResourcesSection from './ResourcesSection.jsx';
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

const DESCRIPTION = 'Definition';
const COMMUNITY_RESOURCES = 'Community Resources';
const RECENT_PAPERS = 'Recent Alliance Papers';
const MEMBERS = 'Members';

const SECTIONS = [{ name: DESCRIPTION }, { name: RECENT_PAPERS }, { name: COMMUNITY_RESOURCES }];

const DiseasePortalPage = () => {
  const { name: dname } = useParams();
  const diseaseData = dname ? data[dname] : data['human'];

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
  const { data: diseaseApiData } = usePageLoadingQuery(`/api/disease/${diseaseData.doid}`);

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
          <Subsection title={DESCRIPTION}>
            {diseaseApiData?.doTerm?.definition && <p>{diseaseApiData.doTerm.definition}</p>}
          </Subsection>
          <Subsection title={RECENT_PAPERS}>
            <PapersSection disease={diseaseData} />
          </Subsection>
          <Subsection title={COMMUNITY_RESOURCES}>
            <ResourcesSection disease={diseaseData} />
          </Subsection>
          <Subsection hideTitle title={MEMBERS}>
            <MembersSection />
          </Subsection>
        </PageData>
      </DataPage>
    </div>
  );
};

export default DiseasePortalPage;
