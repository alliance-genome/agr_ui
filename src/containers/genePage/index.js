/* eslint-disable true */
/*eslint no-unused-vars: "error"*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchGene, fetchAlleles } from '../../actions/genes';
// import { selectAlleles } from'../../selectors/geneSelectors';

import { selectGene } from '../../selectors/geneSelectors';
import Subsection from '../../components/subsection';

import AlleleTable from '../../components/alleleTable';

// import GenomeFeatureViewer from './genomeFeatureViewer';
// import ExpressionLinks from './expressionLinks';

class GenePage extends Component {

  componentDidMount () {
    this.props.dispatch(fetchGene(this.props.match.params.geneId));
    this.props.dispatch(fetchAlleles(this.props.match.params.geneId));
  }

  componentDidUpdate (prevProps) {
    if (this.props.match.params.geneId !== prevProps.match.params.geneId) {
      this.props.dispatch(fetchGene(this.props.match.params.geneId));
      this.props.dispatch(fetchAlleles(this.props.match.params.geneId));
    }
  }

  render () {
    const { alleles,
    // data, error, loading
          } = this.props;

    return (
      <div className='container'>

        <Subsection>
          <AlleleTable data={alleles} />
        </Subsection>

      </div>
    );
  }
}

GenePage.propTypes = {
  alleles: PropTypes.array,
  data: PropTypes.object,
  dispatch: PropTypes.func,
  error: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

function mapStateToProps (state) {
  return selectGene(state);
}

export { GenePage as GenePage };
export default connect(mapStateToProps)(GenePage);
