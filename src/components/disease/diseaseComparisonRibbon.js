/* eslint-disable react/no-set-state */
/**
 * This component will render the following child components
 * OrthologPicker, DiseaseRibbon, DiseaseAssociationTable
 * OthologPicker talks to cc and DiseaseRibbonTalks to DiseaseAssociation Table
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectOrthologs } from '../../selectors/geneSelectors';

import DiseaseAnnotationTable from './diseaseAnnotationTable';
import HorizontalScroll from '../horizontalScroll';
import { STRINGENCY_HIGH } from '../orthology/constants';
import { TAXON_ORDER } from '../../constants';
import {
  compareAlphabeticalCaseInsensitive,
  compareByFixedOrder,
  shortSpeciesName,
  orthologyMeetsStringency,
  compareBy
} from '../../lib/utils';
import {
  StringencySelection,
  getOrthologSpeciesId,
  getOrthologId,
  getOrthologSymbol,
} from '../orthology';

import { GenericRibbon } from '@geneontology/ribbon';
import { POSITION, COLOR_BY } from '@geneontology/ribbon/lib/enums';

import HelpPopup from '../helpPopup';
import DiseaseControlsHelp from './diseaseControlsHelp';
import ControlsContainer from '../controlsContainer';
import Select from 'react-select';
import { Button } from 'reactstrap';
import { selectDiseaseRibbonSummary } from '../../selectors/diseaseRibbonSelectors';
import { fetchDiseaseRibbonSummary } from '../../actions/diseaseRibbonActions';
import LoadingSpinner from '../loadingSpinner';

const makeLabel = (symbol, taxonId) => `${symbol} (${shortSpeciesName(taxonId)})`;
const byStringency = stringency => orthology => orthologyMeetsStringency(orthology, stringency);
const compareBySpeciesThenAlphabetical = compareBy([
  compareByFixedOrder(TAXON_ORDER, o => getOrthologSpeciesId(o)),
  compareAlphabeticalCaseInsensitive(o => getOrthologSymbol(o))
]);

class DiseaseComparisonRibbon extends Component {

  constructor(props){
    super(props);
    this.state = {
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      selectedBlock : {
        subject : null,
        group : null,
      }
    };
    this.onDiseaseGroupClicked = this.onDiseaseGroupClicked.bind(this);
    this.handleOrthologyChange = this.handleOrthologyChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.geneId !== prevProps.geneId) {
      this.fetchData();
    }
  }

  fetchData() {
    this.props.dispatch(fetchDiseaseRibbonSummary(this.getGeneIdList()));
  }

  handleOrthologyChange(selectedOrthologs) {
    this.setState({selectedOrthologs}, () => this.fetchData());
  }

  getGeneIdList() {
    return [this.props.geneId].concat(this.state.selectedOrthologs.map(getOrthologId));
  }

  onDiseaseGroupClicked(gene, disease) {
    this.setState(state => {
      const current = state.selectedBlock;
      return {
        selectedBlock: {
          subject: (current.subject && current.subject.id === gene.id) ? null : gene,
          group: (current.group && current.group.id === disease.id) ? null : disease,
        }
      };
    });
  }

  render(){
    const { orthology, summary } = this.props;
    const { selectedBlock, selectedOrthologs, stringency } = this.state;

    const filteredOrthology = (orthology.data || [])
      .filter(byStringency(this.state.stringency))
      .sort(compareBySpeciesThenAlphabetical);

    if (!summary) {
      return null;
    }

    if (summary.error) {
      // eslint-disable-next-line no-console
      console.log(this.props.summary.error);
      return <span className='text-danger'>Error fetching disease annotation summary</span>;
    }

    if (!summary.data.subjects || !summary.data.categories) {
      return null;
    }

    return (
      <div>
        <div>
          <ControlsContainer>
            <span className='pull-right'>
              <HelpPopup id='disease-controls-help'>
                <DiseaseControlsHelp />
              </HelpPopup>
            </span>
            <b>Compare to ortholog genes</b>
            <StringencySelection level={stringency} onChange={stringency => this.setState({stringency})} />
            <div className='d-flex align-items-baseline'>
              <div className='flex-grow-1'>
                <Select
                  closeMenuOnSelect={false}
                  getOptionLabel={option => makeLabel(getOrthologSymbol(option), getOrthologSpeciesId(option))}
                  getOptionValue={option => getOrthologId(option)}
                  isMulti
                  maxMenuHeight={210}
                  onChange={this.handleOrthologyChange}
                  options={filteredOrthology}
                  placeholder='Select orthologs...'
                  value={selectedOrthologs}
                />
              </div>
              <span className='px-2'>or</span>
              <Button
                color='primary'
                disabled={filteredOrthology.length === 0}
                onClick={() => this.handleOrthologyChange(filteredOrthology)}
              >
                Add all
              </Button>
            </div>
          </ControlsContainer>
        </div>

        <HorizontalScroll width={660}>
          <span style={{display: 'inline-block'}}>
            <GenericRibbon
              categories={summary.data.categories}
              colorBy={COLOR_BY.CLASS_COUNT}
              hideFirstSubjectLabel
              itemClick={this.onDiseaseGroupClicked}
              newTab={false}
              selected={selectedBlock}
              subjectBaseURL={'/gene/'}
              subjectLabelPosition={POSITION.LEFT}
              subjects={summary.data.subjects}
            />
          </span>
          <div>{summary.loading && <LoadingSpinner />}</div>
        </HorizontalScroll>

        {selectedBlock.group && <div className='pt-4'>
          <DiseaseAnnotationTable genes={this.getGeneIdList()} term={selectedBlock.group.id} />
        </div>}

      </div>
    );
  }

}

DiseaseComparisonRibbon.propTypes = {
  diseaseAnnotations: PropTypes.object,
  dispatch: PropTypes.func,
  geneId: PropTypes.string,
  geneSymbol: PropTypes.string,
  geneTaxon: PropTypes.string,
  orthology: PropTypes.object,
  summary: PropTypes.object
};

const mapStateToProps = (state) => ({
  orthology: selectOrthologs(state),
  summary: selectDiseaseRibbonSummary(state),
});

export default connect(mapStateToProps)(DiseaseComparisonRibbon);
