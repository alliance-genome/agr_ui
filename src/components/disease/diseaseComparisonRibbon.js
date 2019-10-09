/* eslint-disable react/no-set-state */
/**
 * This component will render the following child components
 * OrthologPicker, DiseaseRibbon, DiseaseAssociationTable
 * OthologPicker talks to cc and DiseaseRibbonTalks to DiseaseAssociation Table
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import DiseaseAnnotationTable from './diseaseAnnotationTable';
import HorizontalScroll from '../horizontalScroll';
import { STRINGENCY_HIGH } from '../orthology/constants';
import { getOrthologId } from '../orthology';

import { GenericRibbon } from '@geneontology/ribbon';
import { POSITION, COLOR_BY } from '@geneontology/ribbon/lib/enums';
import HelpPopup from '../helpPopup';
import DiseaseControlsHelp from './diseaseControlsHelp';
import ControlsContainer from '../controlsContainer';
import { selectOrthologs } from '../../selectors/geneSelectors';
import { selectDiseaseRibbonSummary } from '../../selectors/diseaseRibbonSelectors';
import { fetchDiseaseRibbonSummary } from '../../actions/diseaseRibbonActions';
import LoadingSpinner from '../loadingSpinner';
import OrthologPicker from '../OrthologPicker';
import RibbonGeneSubjectLabel from '../RibbonGeneSubjectLabel';

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
    this.fetchData()
      .then(() => this.setState({
        selectedBlock: {
          group: {
            id: 'all',
            type: 'GlobalAll',
          },
          block: null,
        }
      }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.geneId !== prevProps.geneId ||
      !isEqual(this.state.selectedOrthologs, prevState.selectedOrthologs)) {
      this.fetchData();
    }
  }

  fetchData() {
    return this.props.dispatch(fetchDiseaseRibbonSummary(this.getGeneIdList()));
  }

  handleOrthologyChange(selectedOrthologs) {
    this.setState({selectedOrthologs});
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
    const { geneSymbol, orthology, summary } = this.props;
    const { selectedBlock, selectedOrthologs } = this.state;

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
            <OrthologPicker
              defaultStringency={STRINGENCY_HIGH}
              disabledSpeciesMessage={`${geneSymbol} has no ortholog genes in this species`}
              id='disease-ortho-picker'
              onChange={this.handleOrthologyChange}
              orthology={orthology.data}
              value={selectedOrthologs}
            />
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
              subjectLabel={subject => <RibbonGeneSubjectLabel subject={subject} />}
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
