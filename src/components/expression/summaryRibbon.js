import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as d3 from 'd3-scale';
import { selectSummary } from '../../selectors/expressionSelectors';
import { fetchExpressionSummary } from '../../actions/expression';
import { RibbonBase } from '@geneontology/ribbon';
import { compareByFixedOrder, compareAlphabeticalCaseInsensitive, sortBy } from '../../lib/utils';
import LoadingSpinner from '../loadingSpinner';

const makeBlocks = (summary, groups, overrideColor) => {
  const blocks = [];
  blocks.push({
    class_id: 'All annotations',
    class_label: 'All annotations',
    color: overrideColor || (summary.totalAnnotations ? '#8BC34A' : '#ffffff'),
    uniqueAssocs: new Array(summary.totalAnnotations),
    uniqueIDs: []
  });
  sortBy(summary.groups, [
    compareByFixedOrder(groups, g => g.name),
    compareAlphabeticalCaseInsensitive(g => g.name)
  ]).forEach(group => {
    if (groups.indexOf(group.name) < 0) {
      return;
    }
    blocks.push({
      class_id: group.name,
      class_label: group.name,
      color: '#fff',
      no_data: false,
      separator: true,
      uniqueAssocs: new Array(group.totalAnnotations),
      uniqueIDs: [],
    });
    const scale = d3.scaleLog().domain([1, group.totalAnnotations + 1]).range(['#ffffff', '#066464']);
    group.terms.forEach(term => {
      blocks.push({
        class_id: term.id,
        class_label: term.name,
        color: overrideColor || (term.numberOfAnnotations === 0 ? '#ffffff' : scale(term.numberOfAnnotations + 1)),
        uniqueAssocs: new Array(term.numberOfAnnotations),
        uniqueIDs: [],
      });
    });
  });
  return blocks;
};

class SummaryRibbon extends React.Component {
  componentDidMount() {
    const { dispatch, geneId, summary } = this.props;
    if (!summary) {
      dispatch(fetchExpressionSummary(geneId));
    }
  }

  render() {
    const { groups, onClick, overrideColor, selectedTerm, showBlockTitles, showSeparatorLabels, summary } = this.props;
    const { data, error, loading } = summary || {};
    return (
      <React.Fragment>
        {loading && <LoadingSpinner />}
        {error && <span className='text-danger'>Could not fetch data. Try again later.</span>}
        {data &&
          <RibbonBase blocks={makeBlocks(data, groups, overrideColor)}
                      currentblock={selectedTerm}
                      onSlimEnter={() => {}}
                      onSlimLeave={() => {}}
                      onSlimSelect={onClick}
                      showBlockTitles={showBlockTitles}
                      showSeparatorLabelPrefixes={false}
                      showSeparatorLabels={showSeparatorLabels}
          />
        }
      </React.Fragment>
    );
  }
}

SummaryRibbon.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string,
  groups: PropTypes.array,
  onClick: PropTypes.func,
  overrideColor: PropTypes.string,
  selectedTerm: PropTypes.object,
  showBlockTitles: PropTypes.bool,
  showSeparatorLabels: PropTypes.bool,
  summary: PropTypes.object,
};

SummaryRibbon.defaultProps = {
  showSeparatorLabels: true,
};

const mapStateToProps = (state, props) => ({
  summary: selectSummary(props.geneId)(state)
});

export default connect(mapStateToProps)(SummaryRibbon);
