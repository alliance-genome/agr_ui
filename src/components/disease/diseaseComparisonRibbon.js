/**
 * This component will render the following child components
 * OrthologPicker, DiseaseRibbon, DiseaseAssociationTable
 * OthologPicker talks to cc and DiseaseRibbonTalks to DiseaseAssociation Table
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { fetchDiseaseAnnotation, fetchDiseaseSummary } from '../../actions/disease';

import { selectDiseaseAnnotation, selectSummary } from '../../selectors/diseaseSelectors';
import { selectOrthologs } from '../../selectors/geneSelectors';

import { DiseaseAnnotationTable } from './diseaseAnnotationTable';
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
      selectedDisease : undefined,
      selectedOrthologs: [],
      summary : {},
      selected : {
        subject : null,
        group : null,
        data : null,
        ready : false,
      }
    };
    this.onDiseaseGroupClicked = this.onDiseaseGroupClicked.bind(this);
    this.handleOrthologyChange = this.handleOrthologyChange.bind(this);
    this.handleTableUpdate = this.handleTableUpdate.bind(this);
    this.getGeneListForDispatch = this.getGeneListForDispatch.bind(this);
  }


  componentDidMount(){
    const { dispatch, geneId, summary} = this.props;
    const { selectedOrthologs } = this.state;

    let geneIdList = ['geneID=' + geneId].concat(this.getOrthologGeneIds(selectedOrthologs));
    if(!summary){
      dispatch(fetchDiseaseSummary('*', geneIdList)).then(data => {
        this.setState({summary : data.summary });
      });
    }
  }


  handleTableUpdate(opts){
    const { dispatch } = this.props;
    let geneIdList = this.getGeneListForDispatch();

    if (this.state.selectedDisease.type == 'GlobalAll'){
      dispatch(fetchDiseaseAnnotation(geneIdList, undefined, opts));
    }
    else{
      dispatch(fetchDiseaseAnnotation(geneIdList, this.state.selectedDisease.id, opts));
    }
  }

  handleOrthologyChange(selectedOrthologs) {
    const { dispatch, geneId } = this.props;

    let geneIdList = ['geneID=' + geneId].concat(this.getOrthologGeneIds(selectedOrthologs));
    dispatch(fetchDiseaseSummary('*', geneIdList)).then(data => {
      this.setState({
        selectedOrthologs: selectedOrthologs,
        summary : data.summary
      });
    });
  }

  onDiseaseGroupClicked(gene, disease) {
    const { dispatch } = this.props;
    let geneIdList = this.getGeneListForDispatch();
    if (disease.type == 'GlobalAll'){
      dispatch(fetchDiseaseAnnotation(geneIdList));
    }
    else{
      dispatch(fetchDiseaseAnnotation(geneIdList, disease.id));
    }
    this.setState({ selectedDisease : disease });

    this.setState({ selected : {
      subject : gene,
      group : disease,
      data : null,
      ready : false
    }});

  }



  getOrthologGeneIds(values) {
    if (values) {
      return values.map( item => {
        return `geneID=${item.homologGene.id}`;
      });
    }
    else{
      return [];
    }
  }

  getGeneListForDispatch(){
    const { geneId } = this.props;
    const { selectedOrthologs } = this.state;
    let geneIdList = this.getOrthologGeneIds(selectedOrthologs);
    geneIdList.push(`geneID=${geneId}`);
    return geneIdList;
  }
  

  hasAnnotations() {
    for(var sub of this.state.summary.subjects) {
      if(sub.nb_annotations > 0)
        return true;
    }
    return false;
  }

  render(){
    const { orthology, geneId } = this.props;
    const filteredOrthology = (orthology.data || [])
      .filter(byStringency(this.state.stringency))
      .sort(compareBySpeciesThenAlphabetical);

    if(!this.state.summary || !this.state.summary.subjects) {
      return('');
    }

    var genes = undefined;
    genes = [];
    for(var sub of this.state.summary.subjects) {
      genes.push(sub.id);
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
            <StringencySelection level={this.state.stringency} onChange={s => this.setState({stringency: s})} />
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
                  value={this.state.selectedOrthologs}
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


        <div style={{display: 'inline-block' }}>
          {
            (this.state.summary && this.state.summary.subjects) ?
              <GenericRibbon
                categories={this.state.summary.categories}
                colorBy={COLOR_BY.CLASS_COUNT}
                hideFirstSubjectLabel
                itemClick={this.onDiseaseGroupClicked}
                newTab={false}
                selected={this.state.selected}
                subjectBaseURL={'/gene/'}
                subjectLabelPosition={POSITION.LEFT}
                subjects={this.state.summary.subjects}
              />
              : ''
          }
        </div>

        <div>
          {(this.hasAnnotations()) ?
            <DiseaseAnnotationTable
              annotations={this.props.diseaseAnnotations}
              geneId={geneId}
              genes={genes}
              onUpdate={this.handleTableUpdate}
              term={this.state.selectedDisease}
            />: <div><i>No data available</i></div>

          }
        </div>

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

const mapStateToProps = (state, props) => ({
  orthology: selectOrthologs(state),
  summary: selectSummary(props.geneId)(state),
  diseaseAnnotations: selectDiseaseAnnotation(state)
});

export default connect(mapStateToProps)(DiseaseComparisonRibbon);
