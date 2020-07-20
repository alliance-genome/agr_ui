import React from 'react';
import PropTypes from 'prop-types';
import Subsection from '../../components/subsection';
import NotFound from '../../components/notFound';
import BasicDiseaseInfo from './basicDiseaseInfo';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import ExternalLink from '../../components/externalLink';
import HeadMetaTags from '../../components/headMetaTags';
import DiseaseToAlleleTable from './DiseaseToAlleleTable';
import DiseaseToGeneTable from './DiseaseToGeneTable';
import DiseaseToModelTable from './DiseaseToModelTable';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import DiseaseName from '../../components/disease/DiseaseName';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel';
import usePageLoadingQuery from '../../hooks/usePageLoadingQuery';

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

  const title = data.name || data.id;

  let keywords = ['disease', data.id, data.name, data.definition];
  if(data.synonyms){
    keywords.push(...data.synonyms);
  }

  let definitions = [data.definition];
  if (data.definitionLinks && data.definitionLinks.length > 0) {
    definitions.push(data.definitionLinks[0]);
  }

  const jsonLd = [
    {
      '@context': 'http://schema.org',
      '@type': 'Dataset',
      '@id': data.id,
      name: data.name,
      description: [definitions].filter(a => !!a).join(' '),
      url: 'https://www.alliancegenome.org/disease/' + data.id,
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
      '@id': data.id,
      identifier: data.id,
      name: data.name,
      url: `https://www.alliancegenome.org/disease/${data.id}`,
      description: data.description,
      'sameAs': data.url, // TODO: add resolver here
    }
  ];


  return (
    <DataPage>
      <HeadMetaTags jsonLd={jsonLd} title={title} />
      <PageNav sections={SECTIONS}>
        <PageNavEntity entityName={<DiseaseName disease={data} />}>
          <ExternalLink href={data.url}>{data.id}</ExternalLink>
        </PageNavEntity>
      </PageNav>
      <PageData>
        <PageCategoryLabel category='disease' />
        <PageHeader entityName={data.name} />

        <Subsection hideTitle title={SUMMARY}>
          <BasicDiseaseInfo disease={data} />
        </Subsection>

        <Subsection title={GENES}>
          <DiseaseToGeneTable id={data.id} />
        </Subsection>

        <Subsection title={ALLELES}>
          <DiseaseToAlleleTable id={data.id} />
        </Subsection>

        <Subsection title={MODELS}>
          <DiseaseToModelTable id={data.id} />
        </Subsection>
      </PageData>
    </DataPage>
  );
};

DiseasePage.propTypes = {
  diseaseId: PropTypes.string.isRequired,
};

export default DiseasePage;
