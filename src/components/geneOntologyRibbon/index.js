/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalScroll from '../horizontalScroll';

// import { POSITION, COLOR_BY, SELECTION } from '@geneontology/ribbon/lib/enums';
// import AssociationsView from '@geneontology/ribbon/lib/view/AssociationsView';

import { STRINGENCY_HIGH } from '../orthology/constants';
import HelpPopup from '../helpPopup';
import GoControlsHelp from './goControlsHelp';
import ControlsContainer from '../controlsContainer';
import { selectOrthologs } from '../../selectors/geneSelectors';
import OrthologPicker from '../OrthologPicker';
import { connect } from 'react-redux';
import { getOrthologId } from '../orthology';
import LoadingSpinner from '../loadingSpinner';
import fetchData from '../../lib/fetchData';
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
        loading : false   // secondary loading for table
      },
      search : ''
    };
    this.handleOrthologyChange = this.handleOrthologyChange.bind(this);
    this.onGOGroupClicked = this.onGOGroupClicked.bind(this);
    this.onGroupClicked = this.onGroupClicked.bind(this);
    this.onSubjectClicked = this.onSubjectClicked.bind(this);
  }

  componentDidMount() {
    // this.fetchSummaryData('goslim_agr', this.getGeneIdList());
    document.addEventListener('cellClick', this.onGroupClicked);
    document.addEventListener('subjectClick', this.onSubjectClicked);    
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
    if(e.target.id == 'go-ribbon') {
      this.onGOGroupClicked(e.detail.subjects[0], e.detail.group);
    }
  }

  onGOGroupClicked(gene, term) {
    // console.log('GENE: ', gene, 'TERM: ', term);
    this.itemClick(gene, term);
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
            loading :  false
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
      ready : false,
      loading : true
    }});

    if(group) {
      // other group
      if(group.type == 'Other') {
      
      // regular group
      } else {

        this.fetchAssociationData(subject.id, group.id)
          .then(data => {
            // console.log('data ', data);
            // if(this.state.excludePB) {
            //   filtered = this.filterPB(data);
            // }
            // if(this.state.onlyEXP) {
            //   filtered = this.getEXP(filtered);
            // }
            // if(!this.state.crossAspect) {
            //   filtered = this.filterCrossAspect(group, filtered);
            // }
            this.setState({ selected : {
              subject : subject,
              group : group,
              data : data, // assoc data from BioLink
              ready : false,
              loading : false
            }});
            // this.buildEvidenceMap();
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
            loading : false
          }
        } , () => {
          // not necessary anymore since exp codes filtered by ribbon table
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
    // console.log('state: ', this.state);
    // console.log('props: ', this.props);
    const { geneTaxon, orthology } = this.props;
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
          <div className='text-nowrap'>
            {
              this.state.loading ? <LoadingSpinner /> :
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
                  subject-base-url='/gene/'
                  subject-open-new-tab={false}
                  subject-position={this.state.ribbon.subjects.length == 1 ? '0' : '1'}
                />
            }
          </div>
          <div>{this.state.loading && <LoadingSpinner />}</div>
          <div className='text-muted mt-2'>
            <i>Cell color indicative of annotation volume</i>
          </div>
        </HorizontalScroll>

        {
          (this.state.loading || this.state.selected.loading) ? <LoadingSpinner /> : 
            (this.state.selected.data && this.state.selected.data.length > 0) ?
              <wc-ribbon-table
                bio-link-data={JSON.stringify(this.state.selected.data)} 
                filter-by={this.state.onlyEXP ? 'evidence:' + exp_codes.join(',') : ''} 
                group-by='term' 
                hide-columns={'qualifier,gene' + (this.state.selected.group.id != 'all' ? ',aspect' : '')}
                order-by='term' 
              />
              : (this.state.selected.group) ? ((this.state.selected.data) ? <NoData/> : <LoadingSpinner />)
                : ''
        }

      </div>
    );
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

