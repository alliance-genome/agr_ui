import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { POSITION, COLOR_BY, SELECTION } from '@geneontology/ribbon/lib/enums';
import HorizontalScroll from '../horizontalScroll';

import GenericRibbon from '@geneontology/ribbon/lib/components/GenericRibbon';
import AssociationsView from '@geneontology/ribbon/lib/view/AssociationsView';

import { STRINGENCY_HIGH } from '../orthology/constants';
import HelpPopup from '../helpPopup';
import GoControlsHelp from './goControlsHelp';
import ControlsContainer from '../controlsContainer';
import { selectOrthologs } from '../../selectors/geneSelectors';
import OrthologPicker from '../OrthologPicker';
import { connect } from 'react-redux';
import { getOrthologId } from '../orthology';

import fetchData from '../../lib/fetchData';

const goApiUrl = 'https://api.geneontology.org/api/';

const exp_codes = ['EXP', 'IDA', 'IPI', 'IMP', 'IGI', 'IEP', 'HTP', 'HDA', 'HMP', 'HGI', 'HEP'];

const Checkbox = props => (
  <input type="checkbox" {...props} />
);

class GeneOntologyRibbon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      subjectBaseURL : '/gene/',
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      excludePB : true,
      excludeIBA : true,
      // onlyEXPWhenMulti : true,
      onlyEXP : false,
      selected : {
        subject : null,
        group : null,
        data : null,
        ready : false,
      },
      search : ''
    };
    this.handleOrthologyChange = this.handleOrthologyChange.bind(this);
  }


  getGeneIdList() {
    return [this.props.id].concat(this.state.selectedOrthologs.map(getOrthologId));
  }

  handleOrthologyChange(selectedOrthologs) {
    this.setState({selectedOrthologs}, () => {
      this.fetchSummaryData('goslim_agr', this.getGeneIdList()).then(data => {
        var oldSubs = [];
        if(this.state.ribbon) {
          oldSubs = this.state.ribbon.subjects;
        }
        for(var sub of data.subjects) {
          oldSubs.push(sub);
        }
        this.setState({ loading : false, ribbon : data, subjects : oldSubs,selected : {
          subject : null,
          group : null,
          data : null,
          ready : false,
        } });
      });
    });
  }

  ribbonOptions(subjects) {
    var excludeIBA = this.state.excludeIBA && subjects.length > 1;
    var exps = '';
    if(this.state.onlyEXP) {
      for(var exp of exp_codes) {
        exps += '&ecodes=' + exp;
      }
    }
    return '&exclude_PB=' + this.state.excludePB + '&exclude_IBA=' + excludeIBA + exps;
  }

  fetchSummaryData(subset, subjects) {
    var subs = '';
    if(subjects instanceof Array) {
      subs = subjects.join('&subject=');
    }
    let query = goApiUrl + 'ontology/ribbon/?subset=' + subset + '&subject=' + subs + this.ribbonOptions(subjects);
    // console.log('Query is ' + query);
    return fetchData(query);
  }

  fetchAssociationData(subject, group) {
    if(group == 'all') {
      var groups = this.state.ribbon.categories.map(elt => {
        return elt.id;
      });
      group = groups.join('&slim=');
    }
    let query = goApiUrl + 'bioentityset/slimmer/function?slim=' + group + '&subject=' + subject + '&rows=-1';
    // console.log('Query is ' + query);
    return fetchData(query);
  }

  /** 
   * building the filters from the keys contained in the subject.groups field of the data response
  */
  buildFilters() {
    var filters = new Map();
    for(var subject of this.state.ribbon.subjects) {
      for (var group in subject.groups) {
        for(var eco in subject.groups[group]) {
          if(eco.toLowerCase() != 'all') {
            filters.set(eco, true);
          }
        }
      }
    }
    return filters;
  }

  sameEntity(entity1, entity2) {
    return  entity1.id == entity2.id && 
            entity1.iri == entity2.iri &&
            JSON.stringify(entity1.category) == JSON.stringify(entity2.category);
  }

  sameEvidences(assoc1, assoc2) {
    if(assoc1.evidence != assoc2.evidence || assoc1.evidence_type != assoc2.evidence_type)
      return false;
    if(JSON.stringify(assoc1.evidence_closure) != JSON.stringify(assoc2.evidence_closure))
      return false;
    if(JSON.stringify(assoc1.evidence_subset_closure) != JSON.stringify(assoc2.evidence_subset_closure))
      return false;
    if(JSON.stringify(assoc1.evidence_type_closure) != JSON.stringify(assoc2.evidence_type_closure))
      return false;
    if(JSON.stringify(assoc1.publications) != JSON.stringify(assoc2.publications))
      return false;
    if(assoc1.reference && assoc2.reference)
      if(JSON.stringify(assoc1.reference) != JSON.stringify(assoc2.reference))
        return false;
    if(JSON.stringify(assoc1.provided_by) != JSON.stringify(assoc2.provided_by))
      return false;
    if(assoc1.evidence_with && assoc2.evidence_with) 
      return JSON.stringify(assoc1.evidence_with) != JSON.stringify(assoc2.evidence_with);
    return true;
  }

  sameAssociation(assoc1, assoc2) {
    if(!this.sameEntity(assoc1.subject, assoc2.subject))
      return false;
    if(!this.sameEntity(assoc1.object, assoc2.object))
      return false;
    if(assoc1.negated != assoc2.negated)
      return false;
    if(assoc1.qualifier && assoc2.qualifier)
      return JSON.stringify(assoc1.qualifier) == JSON.stringify(assoc2.qualifier);
    if(assoc1.slim && assoc2.slim)
      return JSON.stringify(assoc1.slim) == JSON.stringify(assoc2.slim);
    return true;
  }

  evidenceAssociationKey(assoc) {
    return this.associationKey(assoc) + '@' + assoc.evidence_type;    
  }
  
  associationKey(assoc) {
    if(assoc.qualifier) {
      return assoc.subject.id + '@' + assoc.object.id + '@' + assoc.negated + '@' + assoc.qualifier.join('-');      
    }
    return assoc.subject.id + '@' + assoc.object.id + '@' + assoc.negated;
  }

  /**
   * Group association based on the keys (subject , object) and (optional) qualifier
   * @param {*} assoc_data 
   */
  groupAssociations(assoc_data) {
    var grouped_map = new Map();
    for(var assoc of assoc_data) {
      var key = this.associationKey(assoc);
      var array = [];
      if(grouped_map.has(key)) {
        array = grouped_map.get(key);
      } else {
        grouped_map.set(key, array);
      }
      array.push(assoc);
    }
    return grouped_map;
  }

  concatMaps(map1, map2) {
    var map = new Map();
    for(let key of map1.keys()) {
      map.set(key, map1.get(key));
    }
    for(let key of map2.keys()) {
      if(map.has(key)) {
        var current = map.get(key);
        var array = map2.get(key);
        for(var item of array) {
          current.push(item);
        }
        // console.log("concatenated map: (" , key , "): ", current);
      } else {
        map.set(key, map2.get(key));
      }
    }
    return map;
  }

  mergeEvidences(grouped_map) {
    var merged = [];
    for(var group of grouped_map.values()) {
    // console.log("group: ", group);
      if(group.length == 1) {
        merged.push(group[0]);
      } else {
        // merge evidences
        var evidence_map = new Map();
        for(var i = 0; i < group.length; i++) {
          evidence_map = this.concatMaps(evidence_map, group[i].evidence_map);
        }

        group[0].evidence_map = evidence_map;

        // merge publications
        var pubs = new Set();
        for(let i = 0; i < group.length; i++) {
          if(group[i].publications) {
            for(var pub of group[i].publications) {
              pubs.add(pub);
            }
          }
        }
        group[0].publications = Array.from(pubs);

        // merge references
        var refs = new Set();
        for(let i = 0; i < group.length; i++) {
          if(group[i].reference) {
            for(var ref of group[i].reference) {
              refs.add(ref);
            }
          }
        }
        group[0].reference = Array.from(refs);

        merged.push(group[0]);
      }
    }
    return merged;
  }



  /** 
   * build from the association response of BioLink
  */
  buildEvidenceMap() {
    // console.log('assoc_data: ', this.state.selected.data);
    for(var assoc of this.state.selected.data) {
      assoc.evidence_map = new Map();
      assoc.evidence_map.set(assoc.evidence, [
        {
          evidence_id : assoc.evidence,
          evidence_type : assoc.evidence_type,
          evidence_label : assoc.evidence_label,
          evidence_qualifier : assoc.evidence_qualifier ? assoc.evidence_qualifier : [],
          evidence_with : assoc.evidence_with ? assoc.evidence_with : [],
          evidence_refs : assoc.reference ? assoc.reference.filter(ref => ref.startsWith('PMID:')) : []
        }
      ]);
    }

    var grouped_map = this.groupAssociations(this.state.selected.data);
    var merged_map = this.mergeEvidences(grouped_map);

    this.setState({ 
      selected : {
        subject : this.state.selected.subject,
        group : this.state.selected.group,
        data : merged_map,
        ready : true
      }
    });
  }



  itemClick(subject, group) {
    if(this.state.selected.group) {
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
      ready : false
    }});

    if(group) {
      this.fetchAssociationData(subject.id, group.id).then(data => {
        var sorted_assocs = data[0].assocs;
        sorted_assocs.sort((a, b)=> a.object.label.localeCompare(b.object.label));
        var filtered = sorted_assocs;
        if(this.state.excludePB) {
          filtered = this.filterPB(filtered);
        }
        if(this.state.onlyEXP) {
          filtered = this.getEXP(filtered);
        }
        this.setState({ selected : {
          subject : subject,
          group : group,
          data : filtered, // assoc data from BioLink
          ready : false
        }});
        this.buildEvidenceMap();
      });
    }
  }

  filterPB(assocs) {
    var list = [];
    for(var assoc of assocs) {
      if(assoc.object.id != 'GO:0005515') {
        list.push(assoc);
      }
    }
    return list;
  }

  getEXP(assocs) {
    var list = [];
    for(var assoc of assocs) {
      if(assoc.evidence_type in exp_codes) {
        list.push(assoc);
      }
    }
    return list;
  }


  defaultConfig() {
    return {
      termUrlFormatter : this.state.subjectBaseURL
    };
  }  

  showExperimentalAnnotations(event) {
    this.setState({'onlyEXP' : event.target.checked}, () => {
      // console.log('show only experimental annotations:'  , this.state.onlyEXP);

      this.fetchSummaryData('goslim_agr', this.getGeneIdList()).then(data => {
        var oldSubs = [];
        if(this.state.ribbon) {
          oldSubs = this.state.ribbon.subjects;
        }
        for(var sub of data.subjects) {
          oldSubs.push(sub);
        }
        this.setState({ loading : false, ribbon : data, subjects : oldSubs,selected : {
          subject : null,
          group : null,
          data : null,
          ready : false,
        } });
      });

    });
  }

  render() {
    const { orthology } = this.props;
    const { selectedOrthologs } = this.state;
    return (
      <div>
        <div>
          <ControlsContainer>
            <span className='pull-right'>
              <HelpPopup id='go-controls-help'>
                <GoControlsHelp />
              </HelpPopup>
            </span>
            <OrthologPicker
              defaultStringency={STRINGENCY_HIGH}
              disabledSpeciesMessage={this.props.id + ' has no ortholog genes in this species'}
              enabled={false}
              id='go-ortho-picker'
              onChange={this.handleOrthologyChange}
              orthology={orthology.data}
              value={selectedOrthologs}
            />
          </ControlsContainer>
        </div>

        <HorizontalScroll width={1200}>

          <div>
            <Checkbox 
              checked={this.state.onlyEXP} 
              onChange={this.showExperimentalAnnotations.bind(this)}
              style={{ margin: '10px' }} 
              title='When showing the GO functions for multiple orthologs, we recommend switching this on as a number of GO functions are inferred through phylogeny (see PAINT tool)' 
            /> Show only experimental annotations
          </div>
        
          {
            <div style={{ marginTop: '2rem' }}>{
              (this.state.loading)
                ? 'Loading...'
                :

                <GenericRibbon 
                  categories={this.state.ribbon.categories}
                  classLabels={['term', 'terms']}
                  colorBy={COLOR_BY.CLASS_COUNT}
                  
                  hideFirstSubjectLabel={false}

                  itemClick={this.itemClick.bind(this)}
                  newTab={false}

                  selected={this.state.selected}
                  selectionMode={SELECTION.CELL}
                  subjectBaseURL={this.state.subjectBaseURL}
                  subjectLabelPosition={POSITION.LEFT}
                  subjectUseTaxonIcon
                  subjects={this.state.ribbon.subjects}
                />
            }
            {
              (this.state.selected.data && this.state.selected.ready) ? 
                <AssociationsView 
                  blocks={null}
                  borderBottom
                  config={this.defaultConfig()}
                  currentblock={null}
                  filters={this.buildFilters()}
                  focalblock={null}
                  oddEvenColor={false}
                  provided_list={this.state.selected.data}
                  tableLabel={''}
                  termInNewPage
                  termURL={'http://amigo.geneontology.org/amigo/term/'}
                />
                : ''
            }
            </div>
          }
        </HorizontalScroll>
      </div>
    );
  }

}

GeneOntologyRibbon.propTypes = {
  id: PropTypes.string.isRequired,
  orthology: PropTypes.object
};

const mapStateToProps = (state) => ({
  orthology: selectOrthologs(state)
});

export default connect(mapStateToProps)(GeneOntologyRibbon);

