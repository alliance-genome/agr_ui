/* eslint-disable react/no-set-state */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalScroll from '../horizontalScroll';

import { STRINGENCY_HIGH } from '../orthology/constants';
import HelpPopup from '../helpPopup';
import GoControlsHelp from './goControlsHelp';
import ControlsContainer from '../controlsContainer';
import { selectOrthologs } from '../../selectors/geneSelectors';
import OrthologPicker from '../OrthologPicker';
import { connect } from 'react-redux';
import { getOrthologId } from '../orthology';
import fetchData from '../../lib/fetchData';

import LoadingSpinner from '../loadingSpinner';
// import NoData from '../noData';


const GO_API_URL = 'https://api.geneontology.org/api/';
const EXP_CODES = ['EXP', 'IDA', 'IPI', 'IMP', 'IGI', 'IEP', 'HTP', 'HDA', 'HMP', 'HGI', 'HEP'];


class GeneOntologyRibbon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      applyingFilters : false,      // if ortholgs are loading or any other filtering is happening
      loading : true,               // if ribbon strips loading
      subjectBaseURL : '/gene/',
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      crossAspect : false,
      excludePB : true,
      excludeIBA : true,
      onlyEXP : false,
      subset : 'goslim_agr',
      selected : {
        subject : null,
        group : null,
        data : null,
        loading : false             // if ribbon table loading
      },
      search : ''
    };
    this.handleOrthologyChange = this.handleOrthologyChange.bind(this);
    this.selectGroup = this.selectGroup.bind(this);
    this.onGroupClicked = this.onGroupClicked.bind(this);
    this.onSubjectClicked = this.onSubjectClicked.bind(this);
  }

  componentDidMount() {
    document.addEventListener('cellClick', this.onGroupClicked);
    document.addEventListener('subjectClick', this.onSubjectClicked);    
  }



  // ===================================================================
  //                      API QUERY SECTION
  // ===================================================================

  ribbonOptions() {
    // var excludeIBA = this.state.excludeIBA && subjects.length > 1;
    var excludeIBA = false;
    var exps = '';
    if(this.state.onlyEXP) {
      for(var exp of EXP_CODES) {
        exps += '&ecodes=' + exp;
      }
    }
    return  '&exclude_PB=' + this.state.excludePB + '&exclude_IBA=' + excludeIBA +
            '&cross_aspect=' + this.state.crossAspect + exps;
  }

  /**
   * Fetch ribbon data to fill the ribbon strips
   * @param {*} subset a subset or slim id (eg goslim_agr)
   * @param {*} subjects an array of subjects (gene ids)
   */
  fetchSummaryData(subset, subjects) {
    let subs = '';
    if(subjects instanceof Array) {
      subs = subjects.join('&subject=');
    }
    let query = GO_API_URL + 'ontology/ribbon/?subset=' + subset + '&subject=' + subs + this.ribbonOptions(subjects);
    return fetchData(query);
  }

  /**
   * Fetch ribbon data to fill the ribbon table
   * @param {*} subject a single subject (gene id)
   * @param {*} group one or more group ids. "all" to fetch data for all groups
   */
  fetchAssociationData(subject, group) {
    if(group == 'all') {
      group = this.state.ribbon.categories.map(elt => {
        return elt.id;
      });
    }
    if (group instanceof Array) {
      group = group.join('&slim=');
    }
    let query = GO_API_URL + 'bioentityset/slimmer/function?slim=' + group + '&subject=' + subject + '&rows=-1';
    return fetchData(query);
  }



  // ===================================================================
  //                    CLIENT-SIDE FILTERING (should be minimized)
  // ===================================================================

  /**
   * Create a deep copy of table data and returns a filtered data object
   * @param {*} group group (eg ontology term) for which we retrieved the associated data
   * @param {*} data association data related to the selected group/term
   */
  applyTableFilters(group, data) {
    let filtered = JSON.parse(JSON.stringify(data));
    for(let sub = 0; sub < filtered.length; sub++) {
      if(this.state.excludePB) {
        filtered[sub].assocs = filtered[sub].assocs.filter(assoc => assoc.object.id != 'GO:0005515');
      }
      if(!this.state.crossAspect) {
        let aspect = this.getCategoryIdLabel(group);
        filtered[sub].assocs = filtered[sub].assocs.filter(assoc => {
          let cat = assoc.object.category[0] == 'molecular_activity' ? 'molecular_function' : assoc.object.category[0];
          return aspect == undefined || cat == aspect[1];              
        });
      }
    }
    return filtered;
  }



  // ===================================================================
  //                          EVENTS HANDLER
  // ===================================================================
  
  onSubjectClicked(e) {
    // to ensure we are only considering events coming from the disease ribbon
    if(this.hasParentElementId(e.target, 'go-ribbon')) {
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
    if(e.target.id != 'go-ribbon') { return; }
    this.selectGroup(e.detail.subjects[0], e.detail.group);
  }

  selectGroup(subject, group) {
    if(this.state.selected.group && group) {
      var sameGroupID = group.id == this.state.selected.group.id;
      var sameGroupType = group.type == this.state.selected.group.type;
      var sameSubject = subject.id == this.state.selected.subject.id;
      if(sameGroupID && sameGroupType && sameSubject) {
        group = undefined;
      }
    }

    this.setState({ selected : {
      subject : subject,
      group : group,
      data : null,
      loading : true
    }});

    // if no group selected, no association to fetch
    if(!group) { return ; } 

    // other group
    if(group.type == 'Other') {
      let aspect = this.getCategory(group);
      let terms = aspect.groups.filter(elt => {
        return elt.type == 'Term';
      });
      terms = terms.map(elt => { return elt.id; });

      this.fetchAssociationData(subject.id, group.id)
        .then(data_all => {

          this.fetchAssociationData(subject.id, terms)
            .then(data_terms => {

              let concat_assocs = [];
              for(let array of data_terms) {
                concat_assocs = concat_assocs.concat(array.assocs);
              }
              
              let other_assocs = this.diffAssociations(data_all[0].assocs, concat_assocs);
              data_all[0].assocs = other_assocs;

              let filtered = this.applyTableFilters(group, data_all);
              this.setState({ selected : {
                subject : subject,
                group : group,
                data : filtered, // assoc data from BioLink
                loading : false
              }});
            });
        });

    // regular group
    } else {
      this.fetchAssociationData(subject.id, group.id)
        .then(data => {
          let filtered = this.applyTableFilters(group, data);
          this.setState({ selected : {
            subject : subject,
            group : group,
            data : filtered, // assoc data from BioLink
            loading : false
          }});
        });
    }

  }

  handleOrthologyChange(selectedOrthologs) {
    this.setState({ 'applyingFilters' : true });
    this.setState({selectedOrthologs}, () => {
      this.fetchSummaryData(this.state.subset, this.getGeneIdList()).then(data => {

        // notify no more filters to apply and data ready
        this.setState({ applyingFilters : false, loading : false, ribbon : data }, () => {
          if(this.state.selected.subject && !this.state.ribbon.subjects.some(sub => sub.id == this.state.selected.subject.id)) {
            this.selectGroup(null, null);
          }            
        });

      }).catch(() => {
        this.setState({ loading : false });
      });
    });
  }
  
  handleExpAnnotations(event) {
    this.setState({ 'applyingFilters' : true });

    this.setState({'onlyEXP' : event.target.checked}, () => {
      this.fetchSummaryData(this.state.subset, this.getGeneIdList()).then(data => {
        this.setState({ applyingFilters : false, loading : false, ribbon : data });
        
      }).catch(() => {
        this.setState({ loading : false });
      });

    });
  }



  // ===================================================================
  //                            RENDERING
  // ===================================================================

  render() {
    return (
      <div>

        { this.renderControls() }

        { this.state.loading ? <LoadingSpinner/> : this.renderRibbonStrips() }

        { this.state.selected.group ? this.state.selected.loading ? <LoadingSpinner/> : this.renderRibbonTable() : '' }

      </div>
    );
  }

  renderControls() {
    const { geneTaxon, orthology } = this.props;
    const { selectedOrthologs } = this.state;

    return(
      <ControlsContainer>
        <span className='pull-right'>
          <HelpPopup id='go-controls-help'>
            <GoControlsHelp />
          </HelpPopup>
        </span>

        <OrthologPicker
          defaultStringency={STRINGENCY_HIGH}
          enabled={false}
          focusTaxonId={geneTaxon}
          id='go-ortho-picker'
          onChange={this.handleOrthologyChange}
          orthology={orthology.data}
          value={selectedOrthologs}
        />

        <div className='form-check form-check-inline'>
          <label className='form-check-label'>
            <input
              checked={this.state.onlyEXP}
              className='form-check-input'
              onChange={this.handleExpAnnotations.bind(this)}
              title='When showing the GO functions for multiple orthologs, we recommend switching this on as a number of GO functions are inferred through phylogeny (see PAINT tool)'
              type='checkbox'
            />
            <b>Show only experimental annotations</b>
          </label>
        </div>

        <div style={{'width':'100%', 'text-align':'right'}}>
          { this.state.applyingFilters ? <LoadingSpinner/> : '' }
        </div>
      </ControlsContainer>
    );
  }

  renderRibbonStrips() {
    return(
      <HorizontalScroll className='text-nowrap'>
        <wc-ribbon-strips 
          category-all-style='1'
          color-by='0'
          data={JSON.stringify(this.state.ribbon)}
          fire-event-on-empty-cells={false}
          group-clickable={false}
          group-open-new-tab={false}
          id='go-ribbon'
          new-tab={false}
          selection-mode='0'
          show-other-group
          subject-base-url='/gene/'
          subject-open-new-tab={false}
          subject-position={this.state.ribbon.subjects.length == 1 ? '0' : '1'}
        />
        <div className='text-muted mt-2'>
          <i>Cell color indicative of annotation volume</i>
        </div>
      </HorizontalScroll>
    );
  }

  renderRibbonTable() {
    if(this.state.selected.subject && this.state.selected.subject.groups[this.state.selected.group.id] && this.state.onlyEXP) {
      let gp = this.state.selected.subject.groups[this.state.selected.group.id];
      let keys = Object.keys(gp);
      let hasEXP = false;
      for(let key of keys) {
        if(EXP_CODES.includes(key)) {
          hasEXP = true;
        }
      }    
      if(!hasEXP) { return ''; }
    }
      
    return(
      <wc-ribbon-table
        bio-link-data={JSON.stringify(this.state.selected.data)} 
        filter-by={this.state.onlyEXP ? 'evidence:' + EXP_CODES.join(',') : ''} 
        group-by='term' 
        hide-columns={'qualifier,' + (this.state.selectedOrthologs.length == 0 ? 'gene,' : '') + (this.state.selected.group.id != 'all' ? ',aspect' : '')}
        order-by='term' 
      />
    );   
  }



  // ===================================================================
  //                      UTILITY FUNCTIONS 
  //            (ideally this belong to somewhere else)
  // ===================================================================

  /**
   * Return the category object for a given group
   * @param {*} group group object (eg ontology term)
   */
  getCategory(group) {
    let cat = this.state.ribbon.categories.filter(cat => {
      return cat.groups.some(gp => gp.id == group.id);
    });
    return cat.length > 0 ? cat[0] : undefined;
  }

  /**
   * Return the category [id, label] for a given group
   * @param {*} group group object (eg ontology term)
   */
  getCategoryIdLabel(group) {
    let cat = this.state.ribbon.categories.filter(cat => {
      return cat.groups.some(gp => gp.id == group.id);
    });
    return cat.length > 0 ? [ cat[0].id, cat[0].label ] : undefined;
  }

  /**
   * Check if a HTML element has a parent with provided id
   * @param {} elt HTML element to check
   * @param {*} id id to look in the parents of provided element
   */
  hasParentElementId(elt, id) {
    if(elt.id == id) { return true; }
    if(!elt.parentElement) { return false; }
    return this.hasParentElementId(elt.parentElement, id);
  }

  getGeneIdList() {
    return [this.props.geneId].concat(this.state.selectedOrthologs.map(getOrthologId));
  }

  associationKey(assoc) {
    if(assoc.qualifier) {
      return assoc.subject.id + '@' + assoc.object.id + '@' + assoc.negated + '@' + assoc.qualifier.join('-');
    }
    return assoc.subject.id + '@' + assoc.object.id + '@' + assoc.negated;
  }

  fullAssociationKey(assoc) {
    var key = this.associationKey(assoc) + '@' + assoc.evidence_type + '@' + assoc.provided_by + '@' + assoc.reference.join('#');
    return key;
  }

  diffAssociations(assocs_all, assocs_exclude) {
    var list = [];
    for(let assoc of assocs_all) {
      let found = false;
      let key_all = this.fullAssociationKey(assoc);
      for(let exclude of assocs_exclude) {
        let key_exclude= this.fullAssociationKey(exclude);
        if(key_all == key_exclude) {
          found = true;
          break;
        }
      }
      if(!found) {
        list.push(assoc);
      }
    }
    return list;
  }

}

GeneOntologyRibbon.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string,
  history: PropTypes.object,
  orthology: PropTypes.object
};

const mapStateToProps = (state) => ({
  orthology: selectOrthologs(state)
});

export default connect(mapStateToProps)(GeneOntologyRibbon);
