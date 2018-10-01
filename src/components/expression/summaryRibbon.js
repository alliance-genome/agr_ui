import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as d3 from 'd3-scale';
import { selectSummary } from '../../selectors/expressionSelectors';
import { fetchExpressionSummary } from '../../actions/expression';
import { RibbonBase } from '@geneontology/ribbon';
import { compareByFixedOrder, compareAlphabeticalCaseInsensitive, sortBy } from '../../lib/utils';
import LoadingSpinner from '../loadingSpinner';

const GROUP_ORDER = [
  'Anatomy',
  'Stage',
  'Cellular Component'
];

const makeBlocks = summary => {
  const blocks = [];
  blocks.push({
    class_id: 'All annotations',
    class_label: `All ${summary.totalAnnotations} annotations`,
    color: '#8BC34A',
    uniqueAssocs: new Array(summary.totalAnnotations),
    uniqueIDs: []
  });
  sortBy(summary.groups, [
    compareByFixedOrder(GROUP_ORDER, g => g.name),
    compareAlphabeticalCaseInsensitive(g => g.name)
  ]).forEach(group => {
    blocks.push({
      class_id: group.name,
      class_label: group.name,
      color: '#fff',
      no_data: false,
      separator: true,
      uniqueAssocs: new Array(group.totalAnnotations),
      uniqueIDs: [],
    });
    const scale = d3.scaleLog().domain([1, group.totalAnnotations]).range(['#ffffff', '#008080']);
    group.terms.forEach(term => {
      blocks.push({
        class_id: term.id,
        class_label: term.name,
        color: term.numberOfAnnotations === 0 ? '#ffffff' : scale(term.numberOfAnnotations + 1),
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
    const { geneId, label, onClick, selectedTerm, showBlockTitles, showLabel, summary } = this.props;
    const { data, error, loading } = summary || {};
    return (
      <div className='d-table-row'>
        {showLabel && <span className='d-table-cell text-nowrap pr-2'>{label || geneId}</span>}
        {loading && <LoadingSpinner />}
        {error && <span className='text-danger'>Could not fetch data. Try agian later.</span>}
        {data &&
          <span className='d-table-cell'>
            <RibbonBase blocks={makeBlocks(data)}
                        currentblock={selectedTerm}
                        onSlimEnter={() => {}}
                        onSlimLeave={() => {}}
                        onSlimSelect={onClick}
                        showBlockTitles={showBlockTitles}
            />
          </span>
        }
      </div>
    );
  }
}

SummaryRibbon.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string,
  label: PropTypes.string,
  onClick: PropTypes.func,
  selectedTerm: PropTypes.object,
  showBlockTitles: PropTypes.bool,
  showLabel: PropTypes.bool,
  summary: PropTypes.object,
};

SummaryRibbon.defaultProps = {
  showLabel: true,
};

const mapStateToProps = (state, props) => ({
  summary: selectSummary(props.geneId)(state)
});

export default connect(mapStateToProps)(SummaryRibbon);
