/* eslint-disable react/no-set-state */
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
import RibbonGeneSubjectLabel from '../RibbonGeneSubjectLabel';
import NoData from '../noData';

const goApiUrl = 'https://api.geneontology.org/api/';

const exp_codes = ['EXP', 'IDA', 'IPI', 'IMP', 'IGI', 'IEP', 'HTP', 'HDA', 'HMP', 'HGI', 'HEP'];

class GeneOntologyRibbon extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      noData : false,
      subjectBaseURL : '/gene/',
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      crossAspect : false,
      excludePB : true,
      excludeIBA : true,
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
    return [this.props.geneId].concat(this.state.selectedOrthologs.map(getOrthologId));
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

        var subject = null, group = null;
        if(this.state.selected) {
          subject = this.state.selected.subject;
          group = this.state.selected.group;
        }

        // Check if the subject exists and if it's still in the list of species to show
        if(subject) {
          var found = false;
          for(let sub of data.subjects) {
            if(subject.id == sub.id) {
              found = true;
            }
          }
          if(!found) {
            subject = null;
            group = null;
          }
        }

        this.setState({ loading : false, ribbon : data, subjects : oldSubs,
          selected : {
            subject : null,
            group : null,
            data : null,
            ready : false,
          }
        }, () => {
          if(subject && group) {
            this.itemClick(subject, group);
          }
        });
      }).catch(() => {
        this.setState({ noData: true, loading : false });
      });
    });
  }

  ribbonOptions() {
    // var excludeIBA = this.state.excludeIBA && subjects.length > 1;
    var excludeIBA = false;
    var exps = '';
    if(this.state.onlyEXP) {
      for(var exp of exp_codes) {
        exps += '&ecodes=' + exp;
      }
    }
    return  '&exclude_PB=' + this.state.excludePB + '&exclude_IBA=' + excludeIBA +
            '&cross_aspect=' + this.state.crossAspect + exps;
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
    } else if (group instanceof Array) {
      group = group.join('&slim=');
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
          evidence_refs : assoc.reference ? assoc.reference.filter(ref => ref.startsWith('PMID:') || ref.startsWith('GO_REF:') || ref.startsWith('Reactome:')) : []
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
      if(group.type == 'Other') {
        let aspect = this.getAspect(group);
        var terms = aspect.groups.filter(elt => {
          return elt.type == 'Term';
        });
        terms = terms.map(elt => { return elt.id; });
        this.fetchAssociationData(subject.id, group.id)
          .then(data_all => {
            var sorted_all = [];
            for(let array of data_all) {
              sorted_all = sorted_all.concat(array.assocs);
            }

            this.fetchAssociationData(subject.id, terms)
              .then(data_terms => {
                var sorted_terms = [];
                for(let array of data_terms) {
                  sorted_terms = sorted_terms.concat(array.assocs);
                }

                var other_assocs = this.diffAssociations(sorted_all, sorted_terms);

                var filtered = other_assocs;
                if(this.state.excludePB) {
                  filtered = this.filterPB(filtered);
                }
                if(this.state.onlyEXP) {
                  filtered = this.getEXP(filtered);
                }
                if(!this.state.crossAspect) {
                  filtered = this.filterCrossAspect(group, filtered);
                }
                this.setState({ selected : {
                  subject : subject,
                  group : group,
                  data : filtered, // assoc data from BioLink
                  ready : false
                }});
                this.buildEvidenceMap();

              });

          });
      } else {

        this.fetchAssociationData(subject.id, group.id)
          .then(data => {
            var sorted_assocs = [];
            for(let array of data) {
              sorted_assocs = sorted_assocs.concat(array.assocs);
            }
            sorted_assocs.sort((a, b)=> a.object.label.localeCompare(b.object.label));
            var filtered = sorted_assocs;
            if(this.state.excludePB) {
              filtered = this.filterPB(filtered);
            }
            if(this.state.onlyEXP) {
              filtered = this.getEXP(filtered);
            }
            if(!this.state.crossAspect) {
              filtered = this.filterCrossAspect(group, filtered);
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
      if(exp_codes.includes(assoc.evidence_type)) {
        list.push(assoc);
      }
    }
    return list;
  }

  /**
   * returns undefined for "ALL" slim term
   * @param {*} group
   */
  getAspect(group) {
    for(let cat of this.state.ribbon.categories) {
      let found = cat.groups.filter(elt => {
        return elt.id == group.id;
      });
      if(found.length > 0) {
        return cat;
      }
    }
    return undefined;
  }

  getAspectIdLabel(group) {
    for(let cat of this.state.ribbon.categories) {
      let found = cat.groups.filter(elt => {
        return elt.id == group.id;
      });
      if(found.length > 0) {
        return [ cat.id , cat.label ];
      }
    }
    return undefined;
  }

  filterCrossAspect(group, assocs) {
    var list = [];
    var aspect = this.getAspectIdLabel(group);
    for(var assoc of assocs) {
      let cat = assoc.object.category[0] == 'molecular_activity' ? 'molecular_function' : assoc.object.category[0];
      if(aspect == undefined || cat == aspect[1]) {
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
        const subject = this.state.selected.subject;
        const group = this.state.selected.group;
        this.setState({ loading : false, ribbon : data, subjects : oldSubs,
          selected : {
            subject : null,
            group : null,
            data : null,
            ready : false,
          }
        } , () => {
          if(subject && group) {
            this.itemClick(subject, group);
          }
        });
      }).catch(() => {
        this.setState({ noData: true, loading : false });
      });

    });
  }

  render() {
    const { geneId, geneTaxon, orthology } = this.props;
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
                  onChange={this.showExperimentalAnnotations.bind(this)}
                  title='When showing the GO functions for multiple orthologs, we recommend switching this on as a number of GO functions are inferred through phylogeny (see PAINT tool)'
                  type='checkbox'
                />
                <b>Show only experimental annotations</b>
              </label>
            </div>
          </ControlsContainer>
        </div>

        <HorizontalScroll>
          {
            (this.state.loading)
              ? 'Loading...'
              :

              (this.state.noData) ?
                '' :
                <div className='text-nowrap'>
                  <GenericRibbon
                    categories={this.state.ribbon.categories}
                    classLabels={['term', 'terms']}
                    colorBy={COLOR_BY.CLASS_COUNT}

                    hideFirstSubjectLabel

                    itemClick={this.itemClick.bind(this)}
                    newTab={false}

                    selected={this.state.selected}
                    selectionMode={SELECTION.CELL}
                    subjectLabel={subject => <RibbonGeneSubjectLabel gene={subject} isFocusGene={subject.id === geneId} />}
                    subjectLabelPosition={POSITION.LEFT}
                    subjects={this.state.ribbon.subjects}
                    subjectUseTaxonIcon
                  />
                </div>
          }
          {
            (this.state.noData) ?
              <NoData /> :
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
        </HorizontalScroll>
      </div>
    );
  }

}

GeneOntologyRibbon.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string,
  orthology: PropTypes.object,
};

const mapStateToProps = (state) => ({
  orthology: selectOrthologs(state)
});

export default connect(mapStateToProps)(GeneOntologyRibbon);

