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

import LoadingPage from '../../components/loadingPage';
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

class DiseasePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchDisease(this.props.match.params.diseaseId));
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    if (this.props.match.params.diseaseId !== prevProps.match.params.diseaseId) {
      dispatch(fetchDisease(this.props.match.params.diseaseId));
    }
  }

  render() {
    const {data, error, loading} = this.props;

    if (loading) {
      return <LoadingPage />;
    }

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


    return (
      <DataPage>
        <HeadMetaTags jsonLd={jsonLd} title={title} />
        <PageNav sections={SECTIONS}>
          <PageNavEntity entityName={<span className='hyphenate'>{disease.name}</span>}>
            <ExternalLink href={disease.url}>{disease.id}</ExternalLink>
          </PageNavEntity>
        </PageNav>
        <PageData>
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
  dispatch: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
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
