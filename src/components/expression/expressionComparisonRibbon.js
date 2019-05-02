/* eslint-disable react/no-set-state */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Select from 'react-select';
import { Button } from 'reactstrap';

import ControlsContainer from '../controlsContainer';
import {
  StringencySelection,
  getOrthologSpeciesId,
  getOrthologId,
  getOrthologSymbol,
} from '../orthology';
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
import HelpPopup from '../helpPopup';
import ExpressionControlsHelp from './expressionControlsHelp';

const makeLabel = (symbol, taxonId) => `${symbol} (${shortSpeciesName(taxonId)})`;

const compareBySpeciesThenAlphabetical = compareBy([
  compareByFixedOrder(TAXON_ORDER, o => getOrthologSpeciesId(o)),
  compareAlphabeticalCaseInsensitive(o => getOrthologSymbol(o))
]);

const byNotHuman = orthology => getOrthologSpeciesId(orthology) !== TAXON_IDS.HUMAN;
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

  handleBlockClick(entity, block) {
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
    const genes = [geneId].concat(selectedOrthologs.map(o => getOrthologId(o)));
    // if only looking at a single yeast gene, just show CC group
    const groups = (geneTaxon === TAXON_IDS.YEAST && selectedOrthologs.length === 0) ? [CC] : [ANATOMY, STAGE, CC];
    return (
      <React.Fragment>
        <div className='pb-4'>
          <ControlsContainer>
            <span className='pull-right'>
              <HelpPopup id='expression-controls-help'>
                <ExpressionControlsHelp />
              </HelpPopup>
            </span>
            <b>Compare to ortholog genes</b>
            <StringencySelection level={stringency} onChange={s => this.setState({stringency: s})} />
            <div className='d-flex align-items-baseline'>
              <div className='flex-grow-1'>
                <Select
                  closeMenuOnSelect={false}
                  getOptionLabel={option => makeLabel(getOrthologSymbol(option), getOrthologSpeciesId(option))}
                  getOptionValue={option => getOrthologId(option)}
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
              <div className='d-table-row' key={getOrthologId(o)}>
                <span className='d-table-cell text-nowrap pr-2'>
                  {makeLabel(getOrthologSymbol(o), getOrthologSpeciesId(o))}
                </span>
                <span className='d-table-cell'>
                  <SummaryRibbon
                    geneId={getOrthologId(o)}
                    groups={groups}
                    key={getOrthologId(o)}
                    label={makeLabel(getOrthologSymbol(o), getOrthologSpeciesId(o))}
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
  const {data} = selectOrthologs(state);
  return {
    orthology: data,
  };
}

export default connect(mapStateToProps)(ExpressionComparisonRibbon);
