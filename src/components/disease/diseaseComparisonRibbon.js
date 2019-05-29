/**
 * This component will render the following child components
 * OrthologPicker, DiseaseRibbon, DiseaseAssociationTable
 * OthologPicker talks to cc and DiseaseRibbonTalks to DiseaseAssociation Table
 */

/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import GenericRibbon from '@geneontology/ribbon/lib/components/GenericRibbon';

//import { getColumns } from './tableColumns';
import { fetchDiseaseAnnotation, fetchDiseaseSummary } from '../../actions/disease';

import { fetchOrthologsWithExpression } from '../../actions/genes';
import { selectOrthologsWithExpression } from '../../selectors/geneSelectors';
import OrthPicker from '../orthPicker';
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
  getOrthologSpeciesId,
  getOrthologId,
  getOrthologSymbol
} from '../orthology';
import { selectSummary } from '../../selectors/diseaseSelectors';
import { GenericRibbon } from '@geneontology/ribbon';
import { POSITION, COLOR_BY } from '@geneontology/ribbon/lib/enums';


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
      selectedTerm: undefined
    };
    this.handleOrthologPickerChange = this.handleOrthologPickerChange.bind(this);
    this.handleOrthologBtnChange = this.handleOrthologBtnChange.bind(this);
    this.handleStringencychange = this.handleStringencychange.bind(this);
    this.onDiseaseGroupClicked = this.onDiseaseGroupClicked.bind(this);
  }



  componentDidMount(){
    const { dispatch, geneId, summary} = this.props;
    const { selectedOrthologs } = this.state;
    let result = this.getOrthologGeneIds(selectedOrthologs);
    dispatch(fetchOrthologsWithExpression(geneId));
    if(!summary){
      dispatch(fetchDiseaseSummary(geneId, result));
    }
  }


  handleLocalStateChangeSummary(){
    const { selectedOrthologs } = this.state;
    const { dispatch, geneId } = this.props;
    let geneIdList = this.getOrthologGeneIds(selectedOrthologs);
    dispatch(fetchDiseaseSummary(geneId, geneIdList));
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

  handleOrthologPickerChange(values){
    this.setState({selectedOrthologs: values }, () => this.handleLocalStateChangeSummary());
  }

  handleOrthologBtnChange(values) {
    this.setState({selectedOrthologs: values}, () => this.handleLocalStateChangeSummary());
  }

  handleStringencychange(strValue){
    this.setState({stringency: strValue });
  }

  handleRibbonChange(e){
    e.preventDefault();
  }

  onDiseaseGroupClicked(gene, disease) {
    const { dispatch } = this.props;
    const { selectedOrthologs } = this.state;
    let geneIdList = this.getOrthologGeneIds(selectedOrthologs);
    let geneId = 'geneID:' + gene.id;
    geneIdList.push(geneId);
    if (disease.type == 'Term'){
      dispatch(fetchDiseaseAnnotation(geneIdList, disease.id));
    }
    else{
      dispatch(fetchDiseaseAnnotation(geneIdList, disease.type));

    }
  }

  render(){
    const { orthology, summary, geneId, diseaseAnnotations } = this.props;
    const { selectedOrthologs, stringency } = this.state;
    const filteredOrthology = (orthology.data || [])
      .filter(byNotHuman)
      .filter(byStringency(stringency))
      .sort(compareBySpeciesThenAlphabetical);
    return (
      <div>
        <div>
          <OrthPicker
            closeMenuOnSelect={false}
            getOptionLabel={option => makeLabel(getOrthologSymbol(option), getOrthologSpeciesId(option))}
            getOptionValue={option => getOrthologId(option)}
            isMulti
            maxMenuHeight={210}
            onBtnChange={this.handleOrthologBtnChange}
            onPickerChange={this.handleOrthologPickerChange}
            onStringencyChange={this.handleStringencychange}
            options={filteredOrthology}
            placeholder={'Select orthologs...'}
            selectedOrthologs={selectedOrthologs}
            stringency={stringency}
          />
        </div>
        <div style={{display: 'inline-block' }}>
          {
            (summary && summary.data) ?
              <GenericRibbon
                categories={summary.data.categories}
                colorBy={COLOR_BY.CLASS_COUNT}
                itemClick={this.onDiseaseGroupClicked}
                subjectLabelPosition={POSITION.RIGHT}
                subjects={summary.data.subjects}
              />
              : <div></div>
          }
        </div>

        <div>
          {(diseaseAnnotations) ?
            <DiseaseAnnotationTable
              annotationObj={diseaseAnnotations[1]}
              annotations={diseaseAnnotations[1].results}
              geneId={geneId}
            /> : <div></div>
          }
        </div>

      </div>
    );
  }
}

DiseaseComparisonRibbon.propTypes = {
  diseaseAnnotations: PropTypes.array,
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
  diseaseAnnotations: state.disease._root.entries[4]
});

export default connect(mapStateToProps)(DiseaseComparisonRibbon);
