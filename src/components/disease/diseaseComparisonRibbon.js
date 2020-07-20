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

import HelpPopup from '../helpPopup';
import DiseaseControlsHelp from './diseaseControlsHelp';
import ControlsContainer from '../controlsContainer';
import { selectOrthologs } from '../../selectors/geneSelectors';
import { selectDiseaseRibbonSummary } from '../../selectors/diseaseRibbonSelectors';
import { fetchDiseaseRibbonSummary } from '../../actions/diseaseRibbonActions';
import LoadingSpinner from '../loadingSpinner';
import OrthologPicker from '../OrthologPicker';

import { withRouter } from 'react-router-dom';

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
    this.onGroupClicked = this.onGroupClicked.bind(this);
    this.onSubjectClicked = this.onSubjectClicked.bind(this);
  }

  componentDidMount() {
    this.fetchData()
      .then(() => this.setState({
        selectedBlock: {
          group: {
            id: 'all',
            type: 'GlobalAll',
          },
          subject: {
            id: this.props.geneId,
          }
        }
      }));

    document.addEventListener('cellClick', this.onGroupClicked);
    document.addEventListener('subjectClick', this.onSubjectClicked);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.geneId !== prevProps.geneId ||
      !isEqual(this.state.selectedOrthologs, prevState.selectedOrthologs)) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('cellClick', this.onGroupClicked);
  }

  fetchData() {
    return this.props.dispatch(fetchDiseaseRibbonSummary(this.getGeneIdList()));
  }

  handleOrthologyChange(selectedOrthologs) {
    this.setState({selectedOrthologs});
    if(this.state.selectedBlock.group) {
      document.getElementById('disease-ribbon').selectGroup(this.state.selectedBlock.group.id);
    }
  }

  getGeneIdList() {
    return [this.props.geneId].concat(this.state.selectedOrthologs.map(getOrthologId));
  }

  hasParentElementId(elt, id) {
    if(elt.id == id)
      return true;
    if(!elt.parentElement)
      return false;
    return this.hasParentElementId(elt.parentElement, id);
  }

  onSubjectClicked(e) {
    // to ensure we are only considering events coming from the disease ribbon
    if(this.hasParentElementId(e.target, 'disease-ribbon')) {
      // don't use the ribbon default action upon subject click
      e.detail.originalEvent.preventDefault();

      // but re-route to alliance gene page
      let { history } = this.props;
      history.push({
        pathname: '/gene/' + e.detail.subject.id
      });
    }
  }

  onGroupClicked(e) {
    // to ensure we are only considering events coming from the disease ribbon
    if(e.target.id == 'disease-ribbon') {
      this.onDiseaseGroupClicked(e.detail.subjects, e.detail.group);
    }
  }

  onDiseaseGroupClicked(gene, disease) {
    this.setState(state => {
      const current = state.selectedBlock;
      return {
        selectedBlock: {
          subject: gene,
          group: (current.group && current.group.id === disease.id) ? null : disease,
        }
      };
    });
  }

  render(){
    const { geneTaxon, orthology, summary } = this.props;
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
              defaultEnabled
              defaultStringency={STRINGENCY_HIGH}
              focusTaxonId={geneTaxon}
              id='disease-ortho-picker'
              onChange={this.handleOrthologyChange}
              orthology={orthology.data}
              value={selectedOrthologs}
            />
          </ControlsContainer>
        </div>

        <HorizontalScroll>
          <div className='text-nowrap'>
            <wc-ribbon-strips
              category-all-style='1'
              color-by='0'
              data={JSON.stringify(summary.data)}
              fire-event-on-empty-cells={false}
              group-clickable={false}
              group-open-new-tab={false}
              id='disease-ribbon'
              new-tab={false}
              selected='all'
              selection-mode='1'
              subject-base-url='/gene/'
              subject-open-new-tab={false}
              subject-position='1'
            />
          </div>
          <div>{summary.loading && <LoadingSpinner />}</div>
          <div className='text-muted mt-2'>
            <i>Cell color indicative of annotation volume</i>
          </div>
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
  history: PropTypes.object,
  orthology: PropTypes.object,
  summary: PropTypes.object
};

const mapStateToProps = (state) => ({
  orthology: selectOrthologs(state),
  summary: selectDiseaseRibbonSummary(state),
});

export default withRouter(connect(mapStateToProps)(DiseaseComparisonRibbon));
