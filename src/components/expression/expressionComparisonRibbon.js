/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button } from 'reactstrap';

import ControlsContainer from '../controlsContainer';
import { StringencySelector } from '../orthology';
import { STRINGENCY_HIGH } from '../orthology/constants';
import { selectOrthologs } from '../../selectors/geneSelectors';
import {
  compareAlphabeticalCaseInsensitive,
  compareByFixedOrder,
  orthologyMeetsStringency,
  shortSpeciesName,
  compareBy,
} from '../../lib/utils';
import {
  TAXON_IDS,
  TAXON_ORDER
} from '../../constants';
import SummaryRibbon from './summaryRibbon';
import AnnotationTable from './annotationTable';
import HorizontalScroll from '../horizontalScroll';

const makeLabel = (symbol, taxonId) => `${symbol} (${shortSpeciesName(taxonId)})`;

const compareBySpeciesThenAlphabetical = compareBy([
  compareByFixedOrder(TAXON_ORDER, o => o.gene2Species),
  compareAlphabeticalCaseInsensitive(o => o.gene2Symbol)
]);

const byNotHuman = orthology => orthology.gene2Species !== TAXON_IDS.HUMAN;
const byStringency = stringency => orthology => orthologyMeetsStringency(orthology, stringency);

const ANATOMY = 'Anatomy';
const STAGE = 'Stage';
const CC = 'Cellular Component';

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
    const filteredOrthology = (orthology || [])
      .filter(byNotHuman)
      .filter(byStringency(stringency))
      .sort(compareBySpeciesThenAlphabetical);
    const genes = [geneId].concat(selectedOrthologs.map(o => o.gene2AgrPrimaryId));
    // if only looking at a single yeast gene, just show CC group
    const groups = (geneTaxon === TAXON_IDS.YEAST && selectedOrthologs.length === 0) ? [CC] : [ANATOMY, STAGE, CC];
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
              <Button
                color='primary'
                disabled={filteredOrthology.length === 0}
                onClick={() => this.setState({selectedOrthologs: filteredOrthology})}
              >
                Add all
              </Button>
            </div>
          </ControlsContainer>
        </div>
        <HorizontalScroll>
          <div className='d-table pb-4'>
            <div className='d-table-row'>
              {selectedOrthologs.length > 0 &&
                <span className='d-table-cell text-nowrap pr-2'>
                  {makeLabel(geneSymbol, geneTaxon)}
                </span>
              }
              <span className='d-table-cell'>
                {geneTaxon === TAXON_IDS.HUMAN && selectedOrthologs.length === 0 ?
                  <i className='text-muted'>Expression data not available for human genes</i> :
                  <SummaryRibbon
                    geneId={geneId}
                    groups={groups}
                    onClick={this.handleBlockClick}
                    overrideColor={geneTaxon === TAXON_IDS.HUMAN && '#dedede'}
                    selectedTerm={selectedTerm}
                    showSeparatorLabels={selectedOrthologs.length === 0}
                  />
                }
              </span>
            </div>
            {selectedOrthologs.sort(compareBySpeciesThenAlphabetical).map((o, idx) => (
              <div className='d-table-row' key={o.gene2AgrPrimaryId}>
                <span className='d-table-cell text-nowrap pr-2'>
                  {makeLabel(o.gene2Symbol, o.gene2Species)}
                </span>
                <span className='d-table-cell'>
                  <SummaryRibbon
                    geneId={o.gene2AgrPrimaryId}
                    groups={groups}
                    key={o.gene2AgrPrimaryId}
                    label={makeLabel(o.gene2Symbol, o.gene2Species)}
                    onClick={this.handleBlockClick}
                    selectedTerm={selectedTerm}
                    showBlockTitles={false}
                    showSeparatorLabels={idx === selectedOrthologs.length - 1}
                  />
                </span>
              </div>
            ))}
          </div>
        </HorizontalScroll>
        {selectedTerm &&
          <div className='pt-4'>
            <AnnotationTable genes={genes} term={selectedTerm.class_id} />
          </div>
        }
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
    orthology: selectOrthologs(state),
  };
}

export default connect(mapStateToProps)(ExpressionComparisonRibbon);
