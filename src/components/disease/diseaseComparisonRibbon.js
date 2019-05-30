/**
 * This component will render the following child components
 * OrthologPicker, DiseaseRibbon, DiseaseAssociationTable
 * OthologPicker talks to cc and DiseaseRibbonTalks to DiseaseAssociation Table
 */

/* eslint-disable react/no-set-state */
/* eslint-disable no-consle */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import GenericRibbon from '@geneontology/ribbon/lib/components/GenericRibbon';

//import { getColumns } from './tableColumns';
import { fetchDiseaseAnnotation, fetchDiseaseSummary } from '../../actions/disease';

import { fetchOrthologsWithExpression } from '../../actions/genes';
import { selectOrthologsWithExpression } from '../../selectors/geneSelectors';
import { selectDiseaseAnnotation } from '../../selectors/diseaseSelectors';
import DiseaseAnnotationTable from './DiseaseAnnotationTable';
import { STRINGENCY_HIGH } from '../orthology/constants';
import { TAXON_IDS, TAXON_ORDER } from '../../constants';
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
import { selectSummary } from '../../selectors/diseaseSelectors';
import { GenericRibbon } from '@geneontology/ribbon';
import { POSITION, COLOR_BY } from '@geneontology/ribbon/lib/enums';
import HelpPopup from '../helpPopup';
import ExpressionControlsHelp from '../expression/expressionControlsHelp';
import ControlsContainer from '../controlsContainer';
import Select from 'react-select';
import { Button } from 'reactstrap';

const makeLabel = (symbol, taxonId) => `${symbol} (${shortSpeciesName(taxonId)})`;
const byNotHuman = orthology => getOrthologSpeciesId(orthology) !== TAXON_IDS.HUMAN;
const byStringency = stringency => orthology => orthologyMeetsStringency(orthology, stringency);
const compareBySpeciesThenAlphabetical = compareBy([
  compareByFixedOrder(TAXON_ORDER, o => getOrthologSpeciesId(o)),
  compareAlphabeticalCaseInsensitive(o => getOrthologSymbol(o))
]);

/* eslint-disable no-debugger */

class DiseaseComparisonRibbon extends Component {

  constructor(props){
    super(props);
    this.state = {
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      selectedTerm: undefined,
      summary : {}
    };
    this.onDiseaseGroupClicked = this.onDiseaseGroupClicked.bind(this);
    this.onOrthologyChange = this.onOrthologyChange.bind(this);
    this.onTableUpdate = this.onTableUpdate.bind(this);
    this.getGeneListForDispatch = this.getGeneListForDispatch.bind(this);
  }


  componentDidMount(){
    const { dispatch, geneId, summary} = this.props;
    const { selectedOrthologs } = this.state;

    let result = this.getOrthologGeneIds(selectedOrthologs);
    //result.push(`geneID=${geneId}`);
    dispatch(fetchOrthologsWithExpression(geneId));
    if(!summary){
      dispatch(fetchDiseaseSummary(geneId, result)).then(data => {
        this.setState({summary : data.summary });
      });
    }
  }

  getGeneListForDispatch(){
    const { geneId } = this.props;
    const { selectedOrthologs } = this.state;
    let geneIdList = this.getOrthologGeneIds(selectedOrthologs);
    geneIdList.push(`geneID=${geneId}`);
    return geneIdList;
  }

  onTableUpdate(){
    const { dispatch } = this.props;
    let geneIdList = this.getGeneListForDispatch();
    //dispatch(fetchDiseaseAnnotation(geneIdList));
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

  onOrthologyChange(selectedOrthologs) {
    const { dispatch, geneId } = this.props;
    let geneIdList = this.getOrthologGeneIds(selectedOrthologs);
    dispatch(fetchDiseaseSummary(geneId, geneIdList)).then(data => {
      this.setState({ summary: {}});
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
  }

  render(){
    const { orthology, geneId, diseaseAnnotations } = this.props;
    const { selectedOrthologs, stringency } = this.state;
    const filteredOrthology = (orthology.data || [])
      .filter(byNotHuman)
      .filter(byStringency(stringency))
      .sort(compareBySpeciesThenAlphabetical);
    console.log('d_annotations: ', diseaseAnnotations);
    return (
      <div>
        <div className='pb-4'>
          <ControlsContainer>
            <span className='pull-right'>
              <HelpPopup id='disease-controls-help'>
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
                  onChange={this.onOrthologyChange}
                  options={filteredOrthology}
                  placeholder='Select orthologs...'
                  value={selectedOrthologs}
                />
              </div>
              <span className='px-2'>or</span>
              <Button
                color='primary'
                disabled={filteredOrthology.length === 0}
                onClick={() => this.onOrthologyChange(filteredOrthology) }
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
                hideFirstSubjectLabel={true}
                itemClick={this.onDiseaseGroupClicked}
                subjectLabelPosition={POSITION.LEFT}
                subjects={this.state.summary.subjects}
              />
              : ''
          }
        </div>
        {/* <button onClick={this.testButton.bind(this)}>Test Button</button> */}

        <div>
          {(diseaseAnnotations.data.length > 0) ?
            <DiseaseAnnotationTable
              annotations={diseaseAnnotations}
              geneId={geneId}
              onUpdate={this.onTableUpdate}
            />: ''
          }
        </div>

      </div>
    );
  }

  // testButton() {
  //   // console.log('Test button activated');
  //   this.handleLocalStateChangeSummary.call();
  // }

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
  orthology: selectOrthologsWithExpression(state),
  summary: selectSummary(props.geneId)(state),
  diseaseAnnotations: selectDiseaseAnnotation(state)
});

export default connect(mapStateToProps)(DiseaseComparisonRibbon);
