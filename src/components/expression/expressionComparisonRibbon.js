/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button } from 'reactstrap';

import ControlsContainer from '../controlsContainer';
import { StringencySelector } from '../orthology';
import { STRINGENCY_HIGH } from '../orthology/constants';
import { selectOrthology } from '../../selectors/geneSelectors';
import {
  compareAlphabeticalCaseInsensitive, filterOrthologyByStringency, shortSpeciesName,
  sortBy,
  compareByFixedOrder,
} from '../../lib/utils';
import {
  TAXON_ORDER
} from '../../constants';
import SummaryRibbon from './summaryRibbon';
import AnnotationTable from './annotationTable';
import HorizontalScroll from '../horizontalScroll';

const makeLabel = (symbol, taxonId) => `${symbol} (${shortSpeciesName(taxonId)})`;

const sortOrthology = orthology => sortBy(orthology, [
  compareByFixedOrder(TAXON_ORDER, o => o.gene2Species),
  compareAlphabeticalCaseInsensitive(o => o.gene2Symbol)
]);

class ExpressionComparisonRibbon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      selectedTerm: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlockClick = this.handleBlockClick.bind(this);
  }

  handleChange(values) {
    this.setState({selectedOrthologs: values});
  }

  handleBlockClick(block) {
    let { selectedTerm } = this.state;
    selectedTerm = (selectedTerm && selectedTerm.class_id === block.class_id) ? undefined : block;
    this.setState({selectedTerm});
  }

  render() {
    const { geneId, geneSymbol, geneTaxon, orthology } = this.props;
    const { stringency, selectedOrthologs, selectedTerm } = this.state;
    const filteredOrthology = orthology && sortOrthology(filterOrthologyByStringency(orthology, stringency));
    const genes = [geneId].concat(selectedOrthologs.map(o => o.gene2AgrPrimaryId));
    return (
      <React.Fragment>
        <div className='pb-4'>
          <ControlsContainer>
            <b>Compare to ortholog genes</b>
            <StringencySelector defaultLevel={stringency} onChange={s => this.setState({stringency: s})} />
            <div className='d-flex align-items-baseline'>
              <div className='flex-grow-1'>
                <Select
                  closeMenuOnSelect={false}
                  getOptionLabel={option => makeLabel(option.gene2Symbol, option.gene2Species)}
                  getOptionValue={option => option.gene2AgrPrimaryId}
                  isMulti
                  maxMenuHeight={210}
                  onChange={this.handleChange}
                  options={filteredOrthology}
                  placeholder='Select orthologs...'
                  value={selectedOrthologs}
                />
              </div>
              <span className='px-2'>or</span>
              <Button color='primary' onClick={() => this.setState({selectedOrthologs: filteredOrthology})}>Add all</Button>
            </div>
          </ControlsContainer>
        </div>
        <HorizontalScroll>
          <div className='d-table pb-4'>
            <SummaryRibbon geneId={geneId}
                          label={makeLabel(geneSymbol, geneTaxon)}
                          onClick={this.handleBlockClick}
                          selectedTerm={selectedTerm}
                          showLabel={selectedOrthologs.length > 0}
                          showSeparatorLabels={selectedOrthologs.length === 0}
            />
            {sortOrthology(selectedOrthologs).map((o, idx) => (
              <SummaryRibbon geneId={o.gene2AgrPrimaryId}
                            key={o.gene2AgrPrimaryId}
                            label={makeLabel(o.gene2Symbol, o.gene2Species)}
                            onClick={this.handleBlockClick}
                            selectedTerm={selectedTerm}
                            showBlockTitles={false}
                            showSeparatorLabels={idx === selectedOrthologs.length - 1}
              />
            ))}
          </div>
        </HorizontalScroll>
        <div className='pt-4'>
          <AnnotationTable genes={genes} term={selectedTerm && selectedTerm.class_id} />
        </div>
      </React.Fragment>
    );
  }
}

ExpressionComparisonRibbon.propTypes = {
  dispatch: PropTypes.func,
  geneId: PropTypes.string.isRequired,
  geneSymbol: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string.isRequired,
  orthology: PropTypes.array,
};

function mapStateToProps (state) {
  return {
    orthology: selectOrthology(state),
  };
}

export default connect(mapStateToProps)(ExpressionComparisonRibbon);
