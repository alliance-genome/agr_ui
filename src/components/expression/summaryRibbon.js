import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectSummary } from '../../selectors/expressionSelectors';
import { fetchExpressionSummary } from '../../actions/expression';

class SummaryRibbon extends React.Component {
  componentDidMount() {
    const { dispatch, geneId, summary } = this.props;
    if (!summary) {
      dispatch(fetchExpressionSummary(geneId));
    }
  }

  render() {
    const { data, error, loading } = this.props.summary || {};
    return <div>{this.props.geneId}: {loading && 'LOADING...'}{data && data.totalAnnotations}{error && 'ERROR!'}</div>;
  }
}

SummaryRibbon.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string,
  summary: PropTypes.object,
};

const mapStateToProps = (state, props) => ({
  summary: selectSummary(props.geneId)(state)
});

export default connect(mapStateToProps)(SummaryRibbon);
