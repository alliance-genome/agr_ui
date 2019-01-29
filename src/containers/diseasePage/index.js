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
    const ASSOCIATIONS = 'Associations';
    const SECTIONS = [
      {name: SUMMARY},
      {name: ASSOCIATIONS}
    ];

    const doLink = (
      <ExternalLink href={'http://www.disease-ontology.org/?id=' + disease.id}>
        {disease.id}
      </ExternalLink>
    );

    return (
      <DataPage title={disease.name || disease.id}>
        <PageNav entityName={disease.name} link={doLink} sections={SECTIONS} />
        <PageData>
          <PageHeader entityName={disease.name} />

          <Subsection hideTitle title={SUMMARY}>
            <BasicDiseaseInfo disease={disease} />
          </Subsection>

          <Subsection title='Associations'>
            <DiseasePageAssociationsTable id={disease.id} />
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
