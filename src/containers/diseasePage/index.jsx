import React from 'react';
import PropTypes from 'prop-types';
import Subsection from '../../components/subsection.jsx';
import NotFound from '../../components/notFound.jsx';
import BasicDiseaseInfo from './basicDiseaseInfo.jsx';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import ExternalLink from '../../components/ExternalLink.jsx';
import HeadMetaTags from '../../components/headMetaTags.jsx';
import DiseaseToAlleleTable from './DiseaseToAlleleTable.jsx';
import DiseaseToGeneTable from './DiseaseToGeneTable.jsx';
import DiseaseToModelTable from './DiseaseToModelTable.jsx';
import PageNavEntity from '../../components/dataPage/PageNavEntity.jsx';
import DiseaseName from '../../components/disease/DiseaseName.jsx';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel.jsx';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';
import CovidInfoLink from '../../components/CovidInfoLink.jsx';

const SUMMARY = 'Summary';
const GENES = 'Associated Genes';
const ALLELES = 'Associated Alleles';
const MODELS = 'Associated Models';
const SECTIONS = [
  {name: SUMMARY},
  {name: GENES},
  {name: ALLELES},
  {name: MODELS},
];

const DiseasePage = ({diseaseId}) => {
  const { isLoading, isError, data } = usePageLoadingQuery(`/api/disease/${diseaseId}`);

  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return null; // the main page loading bar is sufficient
  }

  console.log(data);

  const title = data.doTerm.name || data.doTerm.curie;

  let description = data.doTerm.definition;
  if (data.doTerm.definitionUrls?.length > 0) {
    description += ' ' + data.doTerm.definitionUrls[0];
  }

  let keywords = ['disease', data.doTerm.curie, data.doTerm.name, data.doTerm.definition];
  if(data.doTerm.synonyms){
    keywords.push(...data.doTerm.synonyms);
  }

  let siteUrl = 'https://www.alliancegenome.org/disease/' + data.doTerm.curie;

  const jsonLd = [
    {
      '@context': 'http://schema.org',
      '@type': 'Dataset',
      '@id': data.doTerm.id,
      name: data.doTerm.name,
      description: description,
      url: siteUrl,
      keywords: keywords.join(' '),
      includedInDataCatalog: 'https://www.alliancegenome.org',
      creator: {
        '@type': 'Organization',
        'name': 'Alliance of Genome Resources'
      },
      version: '2.0',
      license: 'CC BY 4.0',
    },
    {
      '@context': 'http://schema.org',
      '@type': 'MedicalCondition',
      '@id': data.doTerm.id,
      identifier: data.doTerm.id,
      name: data.doTerm.name,
      url: siteUrl,
      description: data.doTerm.description,
      'sameAs': siteUrl, // TODO: add resolver here
    }
  ];

  const showCoronavirusResourcesLink = (data.doTerm.curie === 'DOID:0080599') || (data.doTerm.curie === 'DOID:0080600');

  return (
    <DataPage>
      <HeadMetaTags jsonLd={jsonLd} title={title} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity entityName={<DiseaseName disease={data.doTerm} />}>
          <ExternalLink href={siteUrl}>{data.doTerm.curie}</ExternalLink>
        </PageNavEntity>
      </PageNav>
      <PageData>
        {showCoronavirusResourcesLink && (
          <div className='mb-2'>
            <div className='row'>
              <div className='col col-lg-8 offset-lg-2'>
                <CovidInfoLink />
              </div>
            </div>
          </div>
        )}
        <PageCategoryLabel category='disease' />
        <PageHeader>{data.doTerm.name}</PageHeader>

        <Subsection hideTitle title={SUMMARY}>
          <BasicDiseaseInfo disease={data} />
        </Subsection>

        <Subsection title={GENES}>
          <DiseaseToGeneTable id={data.doTerm.curie} />
        </Subsection>

        <Subsection title={ALLELES}>
          <DiseaseToAlleleTable id={data.doTerm.curie} />
        </Subsection>

        <Subsection title={MODELS}>
          <DiseaseToModelTable id={data.doTerm.curie} />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

DiseasePage.propTypes = {
  diseaseId: PropTypes.string.isRequired,
};

export default DiseasePage;
