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

import HeadMetaTags from '../../components/headMetaTags';
import LoadingPage from '../../components/loadingPage';
import Subsection from '../../components/subsection';
import NotFound from '../../components/notFound';
import BasicDiseaseInfo from './basicDiseaseInfo';
import { DiseasePageHeader } from '../../components/disease';
import DiseasePageAssociationsTable from './diseasePageAssociationsTable';

class DiseasePage extends Component {
  constructor(props) {
    super(props);

    this.titleCase = this.titleCase.bind(this);
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

    return (
      <div className='container'>
        <HeadMetaTags title={disease.name ? this.titleCase(disease.name) : disease.doId} />

        <DiseasePageHeader disease={disease} />

        <Subsection>
          <BasicDiseaseInfo disease={disease} />
        </Subsection>

        <Subsection title='Associations'>
          <DiseasePageAssociationsTable id={disease.doId} />
        </Subsection>
      </div>
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
