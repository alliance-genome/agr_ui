import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  fetchDisease,
  fetchAssociations,
  setCurrentPage,
  //setPerPageSize,
} from '../../actions/disease';

import {
  selectData,
  selectAssociations,
  selectTotalAssociations,
  selectPerPageSize,
  selectCurrentPage,
  selectAssociationsError,
  selectLoadingAssociation,
  selectTotalPages,
} from '../../selectors/diseaseSelectors';

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
    this.props.dispatch(fetchAssociations(this.props.params.diseaseId));
  }

  componentDidUpdate(prevProps) {
    if (this.props.params.diseaseId !== prevProps.params.diseaseId) {
      this.props.dispatch(fetchDisease(this.props.params.diseaseId));
      this.props.dispatch(setCurrentPage(1));
      this.props.dispatch(fetchAssociations(this.props.params.diseaseId));
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

        <Subsection title='Associations'>
          <DiseasePageAssociationsTable
            associations={this.props.associations}
            currentPage={this.props.currentPage}
            dispatch={this.props.dispatch}
            id={this.props.params.diseaseId}
            perPageSize={this.props.perPageSize}
            totalAssociations={this.props.totalAssociations}
            totalPages={this.props.totalPages}
          />
        </Subsection>
      </div>
    );
  }
}

DiseasePage.propTypes = {
  associations: PropTypes.arrayOf(PropTypes.object), // An array containing the disease associations.
  associationsError: PropTypes.string,               // Association loading error messages.
  currentPage: PropTypes.number,                     // The current page of the associations table.
  data: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
  loadingAssociations: PropTypes.bool,               // Whether or not we are loading associations.
  params: PropTypes.object,
  perPageSize: PropTypes.number,                     // Number of associations to display per page.
  totalAssociations: PropTypes.number,               // Total number of associations.
  totalPages: PropTypes.number,                      // Total number of pages calculated from the number
                                                     // of associations and the per page setting.
};

// Ideally, the toJS() calls should be removed here for performance reasons.
// Additionally, the react classes that use these props should be modified
// to handle the ImmutableJS counterparts of the JS data structures.
// Leave in for now since I'm unsure of the downstream dependencies.
const mapStateToProps = (state) => {
  return {
    associations: selectAssociations(state).toJS(),
    associationsError: selectAssociationsError(state),
    currentPage: selectCurrentPage(state),
    data: selectData(state).toJS(),
    loadingAssociations: selectLoadingAssociation(state),
    perPageSize: selectPerPageSize(state),
    totalAssociations: selectTotalAssociations(state),
    totalPages: selectTotalPages(state)
  };
};

export { DiseasePage as DiseasePage };
export default connect(mapStateToProps)(DiseasePage);
