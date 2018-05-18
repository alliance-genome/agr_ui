import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchDisease,
} from '../../actions/disease';

import {
  selectData,
  selectError,
  selectLoading,
} from '../../selectors/diseaseSelectors';

import LoadingPage from '../../components/loadingPage';
import Subsection from '../../components/subsection';
import NotFound from '../../components/notFound';
import BasicDiseaseInfo from './basicDiseaseInfo';
import DiseasePageAssociationsTable from './diseasePageAssociationsTable';
import { DataPage, PageNav, PageData, PageHeader } from '../../components/dataPage';
import ExternalLink from '../../components/externalLink';

class DiseasePage extends Component {
  constructor(props) {
    super(props);

    this.titleCase = this.titleCase.bind(this);
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(fetchDisease(params.diseaseId));
  }

  componentDidUpdate(prevProps) {
    const { dispatch, params } = this.props;
    if (params.diseaseId !== prevProps.params.diseaseId) {
      dispatch(fetchDisease(params.diseaseId));
    }
  }

  renderError() {
    let e = this.props.error;
    if (!e) {
      return null;
    }
    return <NotFound />;
  }

  titleCase(str) {
    return str.toLowerCase().trim().split(' ').map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
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
    const ASSOCIATIONS = 'Associations';
    const SECTIONS = [SUMMARY, ASSOCIATIONS];

    const doLink = (
      <ExternalLink href={'http://www.disease-ontology.org/?id=' + disease.doId}>
        {disease.doId}
      </ExternalLink>
    );

    return (
      <DataPage title={disease.name || disease.doId}>
        <PageNav entityName={disease.name} link={doLink} sections={SECTIONS} />
        <PageData>
          <PageHeader entityName={disease.name} />

          <Subsection hideTitle title={SUMMARY}>
            <BasicDiseaseInfo disease={disease} />
          </Subsection>

          <Subsection title='Associations'>
            <DiseasePageAssociationsTable id={disease.doId} />
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
  params: PropTypes.object,
};

// Ideally, the toJS() calls should be removed here for performance reasons.
// Additionally, the react classes that use these props should be modified
// to handle the ImmutableJS counterparts of the JS data structures.
// Leave in for now since I'm unsure of the downstream dependencies.
const mapStateToProps = (state) => {
  return {
    data: selectData(state).toJS(),
    error: selectError(state),
    loading: selectLoading(state),
  };
};

export { DiseasePage as DiseasePage };
export default connect(mapStateToProps)(DiseasePage);
