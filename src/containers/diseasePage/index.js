import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchDisease } from '../../actions/disease';
import { selectDisease } from '../../selectors/disease';

import ExternalLink from '../../components/externalLink';
import HeadMetaTags from '../../components/headMetaTags';
import LoadingPage from '../../components/loadingPage';
import Subsection from '../../components/subsection';
import NotFound from '../../components/notFound';
import BasicDiseaseInfo from './basicDiseaseInfo';
import { DiseasePageAssociationsTable } from '../../components/disease';

class DiseasePage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchDisease(this.props.params.diseaseId));
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.diseaseId !== prevProps.params.diseaseId) {
      this.props.dispatch(fetchDisease(this.props.params.diseaseId));
    }
  }

  renderError() {
    let e = this.props.error;
    if (!e) {
      return null;
    }
    return <NotFound />;
  }

  render() {
    const disease = this.props.data;
    const title = this.props.params.diseaseId;
    if (this.props.loading) {
      return <LoadingPage />;
    }
    if (!disease) {
      return this.renderError();
    }
    return (
      <div className='container'>
        <HeadMetaTags title={title} />

        <div className='alert alert-warning'>
          <i className='fa fa-warning' /> Page under active development
        </div>
        <h1>
          {disease.name}
          &nbsp;
          <small>
            (<ExternalLink href={'http://www.disease-ontology.org/?id=' + disease.doId}>
              {disease.doId}
            </ExternalLink>)
          </small>
          <hr />
        </h1>

        <Subsection>
          <BasicDiseaseInfo disease={disease} />
        </Subsection>

        <Subsection hardcoded title='Associations'>
          <DiseasePageAssociationsTable />
        </Subsection>
      </div>
    );
  }
}

DiseasePage.propTypes = {
  data: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  params: PropTypes.object,
};

function mapStateToProps(state) {
  return selectDisease(state);
}

export { DiseasePage as DiseasePage };
export default connect(mapStateToProps)(DiseasePage);
