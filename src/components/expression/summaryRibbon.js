import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as d3 from 'd3-scale';
import { selectSummary } from '../../selectors/expressionSelectors';
import { fetchExpressionSummary } from '../../actions/expression';
import { RibbonBase } from '@geneontology/ribbon';
import { POSITION } from '@geneontology/ribbon/lib/enums';
import { SlimType } from '@geneontology/ribbon/lib/dataHelpers';


import { compareByFixedOrder, compareAlphabeticalCaseInsensitive, sortBy } from '../../lib/utils';
import LoadingSpinner from '../loadingSpinner';

const highLevelTermIds = {
  Anatomy: 'UBERON:0001062',
  Stage: 'UBERON:0000000',
  Subcellular: 'GO:0005575',
};

const makeBlocks = (summary, groups, overrideColor) => {
  const blocks = [];

  blocks.push({
    class_id: '',
    class_label: 'All annotations',
    color: overrideColor || (summary.totalAnnotations ? '#8BC34A' : '#ffffff'),
    uniqueAssocs: new Array(summary.totalAnnotations),
    uniqueIDs: [],
    type : SlimType.All,
  });

  sortBy(summary.groups, [
    compareByFixedOrder(groups, g => g.name),
    compareAlphabeticalCaseInsensitive(g => g.name)

  ]).forEach(group => {
    if (groups.indexOf(group.name) < 0) {
      return;
    }

    blocks.push({
      aspect : group.name,
      class_id: group.name + ' aspect',
      class_label: group.name,
      color: '#fff',
      no_data: false,
      separator: true,
      uniqueAssocs: [],
      uniqueIDs: [],
      nbAnnotations : 0,
      type : SlimType.Aspect
    });
    blocks.push({
      aspect : group.name,
      class_id: highLevelTermIds[group.name] || '',
      class_label: 'All ' + group.name,
      color: '#fff',
      no_data: false,
      uniqueAssocs: new Array(group.totalAnnotations),
      uniqueIDs: [],
      type : SlimType.AllFromAspect
    });

    const scale = d3.scaleLog().domain([1, group.totalAnnotations + 1]).range(['#ffffff', '#066464']);
    group.terms.forEach(term => {
      let isOtherType = term.name.toLowerCase().includes('other');
      blocks.push({
        class_id: term.id,
        class_label: term.name,
        color: overrideColor || (term.numberOfAnnotations === 0 ? '#ffffff' : scale(term.numberOfAnnotations + 1)),
        uniqueAssocs: new Array(term.numberOfAnnotations),
        uniqueIDs: [],
        nbAnnotations : term.numberOfAnnotations,
        type : isOtherType ? SlimType.Other : SlimType.Item,
        aspect : group.name
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

    var entity = { };
    if(data && groups) {

      entity = {
        subject : this.props.geneId,
        label : this.props.geneId,
        taxon : 'N/A',
        filters : []
      };
      entity.blocks = makeBlocks(data, groups, overrideColor);
    }

    return (
      <React.Fragment>
        {loading && <LoadingSpinner />}
        {error && <span className='text-danger'>Could not fetch data. Try again later.</span>}
        {data &&
          <RibbonBase
            blocks={entity.blocks}
            currentEntity={entity}
            currentblock={selectedTerm}
            entity={entity}
            entityLabel={POSITION.NONE}
            maxColor={[37, 152, 197]}
            onSlimEnter={() => {}}
            onSlimLeave={() => {}}
            onSlimSelect={onClick}
            showBlockTitles={showBlockTitles}
            showSeparatorLabelPrefixes={false}
            showSeparatorLabels={showSeparatorLabels}
            title={entity.label}
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
  overrideColor: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  selectedTerm: PropTypes.object,
  showBlockTitles: PropTypes.bool,
  showSeparatorLabels: PropTypes.bool,
  summary: PropTypes.object,
};

SummaryRibbon.defaultProps = {
  showSeparatorLabels: true,
};

const mapStateToProps = (state, props) => (
  {
    summary: selectSummary(props.geneId)(state)
  });

export default connect(mapStateToProps)(SummaryRibbon);
