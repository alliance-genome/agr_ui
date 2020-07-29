import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchDisease,
} from '../../actions/diseaseActions';

import {
  selectData,
  selectError,
  selectLoading,
} from '../../selectors/diseaseSelectors';

import Subsection from '../../components/subsection';
import NotFound from '../../components/notFound';
import BasicDiseaseInfo from './basicDiseaseInfo';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import ExternalLink from '../../components/externalLink';
import HeadMetaTags from '../../components/headMetaTags';
import DiseaseToAlleleTable from './DiseaseToAlleleTable';
import DiseaseToGeneTable from './DiseaseToGeneTable';
import DiseaseToModelTable from './DiseaseToModelTable';
import {setPageLoading} from '../../actions/loadingActions';
import PageNavEntity from '../../components/dataPage/PageNavEntity';
import DiseaseName from '../../components/disease/DiseaseName';
import PageCategoryLabel from '../../components/dataPage/PageCategoryLabel';
import CovidInfoLink from '../../components/CovidInfoLink';

class DiseasePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchDiseaseData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.diseaseId !== prevProps.diseaseId) {
      this.fetchDiseaseData();
    }
  }

  fetchDiseaseData() {
    const { diseaseId, dispatch } = this.props;
    dispatch(setPageLoading(true));
    dispatch(fetchDisease(diseaseId)).finally(() => dispatch(setPageLoading(false)));
  }

  render() {
    const {data, error} = this.props;

    if (error) {
      return <NotFound />;
    }

    if (!data || !Object.keys(data).length) {
      return null;
    }

    const disease = this.props.data;

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

    const title = disease.name || disease.id;

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

    const showCoronavirusResourcesLink = (data.id === 'DOID:0080599') || (data.id === 'DOID:0080600');

    return (
      <DataPage>
        <HeadMetaTags jsonLd={jsonLd} title={title} />
        <PageNav sections={SECTIONS}>
          <PageNavEntity entityName={<DiseaseName disease={disease} />}>
            <ExternalLink href={disease.url}>{disease.id}</ExternalLink>
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
          <PageHeader entityName={disease.name} />

          <Subsection hideTitle title={SUMMARY}>
            <BasicDiseaseInfo disease={disease} />
          </Subsection>

          <Subsection title={GENES}>
            <DiseaseToGeneTable id={disease.id} />
          </Subsection>

          <Subsection title={ALLELES}>
            <DiseaseToAlleleTable id={disease.id} />
          </Subsection>

          <Subsection title={MODELS}>
            <DiseaseToModelTable id={disease.id} />
          </Subsection>
        </PageData>
      </DataPage>
    );
  }
}

DiseasePage.propTypes = {
  data: PropTypes.object,
  diseaseId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    data: selectData(state),
    error: selectError(state),
    loading: selectLoading(state),
  };
};

export { DiseasePage as DiseasePage };
export default connect(mapStateToProps)(DiseasePage);
