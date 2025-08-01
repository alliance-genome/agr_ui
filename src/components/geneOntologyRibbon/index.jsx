import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HorizontalScroll from '../horizontalScroll.jsx';

import { STRINGENCY_HIGH } from '../homology/constants';
import ControlsContainer from '../controlsContainer.jsx';
import OrthologPicker from '../OrthologPicker.jsx';
import { getOrthologId } from '../orthology';
import fetchData from '../../lib/fetchData';

import LoadingSpinner from '../loadingSpinner.jsx';

import NoData from '../noData.jsx';
import { useNavigate } from 'react-router-dom';

const GO_API_URL = 'https://api.geneontology.org/api/';
const EXP_CODES = ['EXP', 'IDA', 'IPI', 'IMP', 'IGI', 'IEP', 'HTP', 'HDA', 'HMP', 'HGI', 'HEP'];

class GeneOntologyRibbon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      compareOrthologs: false,
      applyingFilters: false, // if ortholgs are loading or any other filtering is happening
      loading: true, // if ribbon strips loading
      error: false, // if the ribbon encountered any error while loading (eg ID not present in mygene.info)
      subjectBaseURL: '/gene/',
      stringency: STRINGENCY_HIGH,
      selectedOrthologs: [],
      crossAspect: false,
      filterReference: true,
      excludePB: true,
      excludeIBA: true,
      onlyEXP: false,
      subset: 'goslim_agr',
      selected: {
        subject: null,
        group: null,
        data: null,
        loading: false, // if ribbon table loading
        error: false, // not used yet but follow the same logic as for the strips - can be used if errors occured while loading the table (should never happened)
      },
      search: '',
    };
    this.handleOrthologyChange = this.handleOrthologyChange.bind(this);
    this.handleCompareOrthologsChange = this.handleCompareOrthologsChange.bind(this);
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
    const excludeIBA = false;
    let exps = '';
    if (this.state.onlyEXP) {
      for (let exp of EXP_CODES) {
        exps += '&ecodes=' + exp;
      }
    }
    return (
      '&exclude_PB=' +
      this.state.excludePB +
      '&exclude_IBA=' +
      excludeIBA +
      '&cross_aspect=' +
      this.state.crossAspect +
      exps
    );
  }

  /**
   * Fetch ribbon data to fill the ribbon strips
   * @param {*} subset a subset or slim id (eg goslim_agr)
   * @param {*} subjects an array of subjects (gene ids)
   */
  fetchSummaryData(subset, subjects) {
    let subs = '';
    if (subjects instanceof Array) {
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
    if (group === 'all') {
      group = this.state.ribbon.categories.map((elt) => {
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
    for (let sub = 0; sub < filtered.length; sub++) {
      if (this.state.excludePB) {
        filtered[sub].assocs = filtered[sub].assocs.filter((assoc) => assoc.object.id !== 'GO:0005515');
      }
      if (!this.state.crossAspect) {
        let aspect = this.getCategoryIdLabel(group);
        filtered[sub].assocs = filtered[sub].assocs.filter((assoc) => {
          const cat =
            assoc.object.category[0] === 'molecular_activity' ? 'molecular_function' : assoc.object.category[0];
          return aspect === undefined || cat === aspect[1];
        });
      }
      if (this.state.filterReference) {
        filtered[sub].assocs = filtered[sub].assocs.filter((assoc) => {
          assoc.reference = assoc.reference.filter(
            (ref) =>
              ref.includes('PMID:') || ref.includes('DOI:') || ref.includes('GO_REF:') || ref.includes('Reactome:')
          );
          return assoc;
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
    if (this.hasParentElementId(e.target, 'go-ribbon')) {
      // don't use the ribbon default action upon subject click
      e.detail.originalEvent.preventDefault();

      // but re-route to alliance gene page
      let { history } = this.props;
      history.push({
        pathname: '/gene/' + e.detail.subject.id,
      });
    }
  }

  onGroupClicked(e) {
    // to ensure we are only considering events coming from the disease ribbon
    if (e.target.id !== 'go-ribbon') {
      return;
    }
    this.selectGroup(e.detail.subjects[0], e.detail.group);
  }

  selectGroup(subject, group) {
    if (this.state.selected.group && group) {
      const sameGroupID = group.id === this.state.selected.group.id;
      const sameGroupType = group.type === this.state.selected.group.type;
      const sameSubject = subject.id === this.state.selected.subject.id;
      if (sameGroupID && sameGroupType && sameSubject) {
        group = undefined;
      }
    }

    this.setState({
      selected: {
        subject: subject,
        group: group,
        data: null,
        loading: true,
        error: false,
      },
    });

    // if no group selected, no association to fetch
    if (!group) {
      return;
    }

    // other group
    if (group.type === 'Other') {
      let aspect = this.getCategory(group);
      let terms = aspect.groups.filter((elt) => {
        return elt.type === 'Term';
      });
      terms = terms.map((elt) => {
        return elt.id;
      });

      this.fetchAssociationData(subject.id, group.id)
        .then((data_all) => {
          this.fetchAssociationData(subject.id, terms)
            .then((data_terms) => {
              let concat_assocs = [];
              for (let array of data_terms) {
                concat_assocs = concat_assocs.concat(array.assocs);
              }

              let other_assocs = this.diffAssociations(data_all[0].assocs, concat_assocs);
              data_all[0].assocs = other_assocs;

              let filtered = this.applyTableFilters(group, data_all);
              this.setState({
                selected: {
                  subject: subject,
                  group: group,
                  data: filtered, // assoc data from BioLink
                  loading: false,
                  error: false,
                },
              });
            })
            .catch(() => {
              this.setState({ loading: false, error: true });
            });
        })
        .catch(() => {
          this.setState({ loading: false, error: true });
        });
      // regular group
    } else {
      this.fetchAssociationData(subject.id, group.id)
        .then((data) => {
          let filtered = this.applyTableFilters(group, data);
          this.setState({
            selected: {
              subject: subject,
              group: group,
              data: filtered, // assoc data from BioLink
              loading: false,
              error: false,
            },
          });
        })
        .catch(() => {
          this.setState({ selected: { loading: false, error: true } });
        });
    }
  }

  handleOrthologyChange(selectedOrthologs) {
    this.setState({ applyingFilters: true });
    this.setState({ selectedOrthologs }, () => {
      this.fetchSummaryData(this.state.subset, this.getGeneIdList())
        .then((data) => {
          data = this.ensureFocusGeneIsPopulated(data);
          // notify no more filters to apply and data ready
          this.setState(
            {
              applyingFilters: false,
              loading: false,
              error: false,
              ribbon: data,
            },
            () => {
              if (
                this.state.selected.subject &&
                !this.state.ribbon.subjects.some((sub) => sub.id === this.state.selected.subject.id)
              ) {
                this.selectGroup(null, null);
              }
            }
          );
        })
        .catch(() => {
          this.setState({ loading: false, error: true });
        });
    });
  }

  handleCompareOrthologsChange(compareOrthologs) {
    this.setState({ compareOrthologs });
  }

  handleExpAnnotations(event) {
    this.setState({ applyingFilters: true });
    this.setState({ onlyEXP: event.target.checked }, () => {
      this.fetchSummaryData(this.state.subset, this.getGeneIdList())
        .then((data) => {
          data = this.ensureFocusGeneIsPopulated(data);
          this.setState({ applyingFilters: false, loading: false, error: false, ribbon: data });
        })
        .catch(() => {
          this.setState({ loading: false, error: true });
        });
    });
  }

  // ===================================================================
  //                      UTILITY FUNCTIONS
  //            (ideally this belong to somewhere else)
  // ===================================================================

  ensureFocusGeneIsPopulated(data) {
    // Fix AGR-2000: always show the focus gene even if no annotation
    const hasFocusGene = data.subjects.some((sub) => sub.id === this.props.geneId);
    const subjects = [...data.subjects];
    if (!hasFocusGene) {
      subjects.unshift({
        id: this.props.geneId,
        label: this.props.geneSymbol,
        nb_annotations: 0,
        nb_classes: 0,
        taxon_id: this.props.geneSpecies.taxonId,
        taxon_label: this.props.geneSpecies.name,
        groups: {},
      });
    }
    return {
      ...data,
      subjects,
    };
  }

  /**
   * Return the category object for a given group
   * @param {*} group group object (eg ontology term)
   */
  getCategory(group) {
    let cat = this.state.ribbon.categories.filter((cat) => {
      return cat.groups.some((gp) => gp.id === group.id);
    });
    return cat.length > 0 ? cat[0] : undefined;
  }

  /**
   * Return the category [id, label] for a given group
   * @param {*} group group object (eg ontology term)
   */
  getCategoryIdLabel(group) {
    let cat = this.state.ribbon.categories.filter((cat) => {
      return cat.groups.some((gp) => gp.id === group.id);
    });
    return cat.length > 0 ? [cat[0].id, cat[0].label] : undefined;
  }

  /**
   * Check if a HTML element has a parent with provided id
   * @param {} elt HTML element to check
   * @param {*} id id to look in the parents of provided element
   */
  hasParentElementId(elt, id) {
    if (elt.id === id) {
      return true;
    }
    if (!elt.parentElement) {
      return false;
    }
    return this.hasParentElementId(elt.parentElement, id);
  }

  getGeneIdList() {
    return [this.props.geneId].concat(this.state.selectedOrthologs.map(getOrthologId));
  }

  associationKey(assoc) {
    if (assoc.qualifier) {
      return assoc.subject.id + '@' + assoc.object.id + '@' + assoc.negated + '@' + assoc.qualifier.join('-');
    }
    return assoc.subject.id + '@' + assoc.object.id + '@' + assoc.negated;
  }

  fullAssociationKey(assoc) {
    const key =
      this.associationKey(assoc) +
      '@' +
      assoc.evidence_type +
      '@' +
      assoc.provided_by +
      '@' +
      assoc.reference.join('#');
    return key;
  }

  diffAssociations(assocs_all, assocs_exclude) {
    const list = [];
    for (let assoc of assocs_all) {
      let found = false;
      let key_all = this.fullAssociationKey(assoc);
      for (let exclude of assocs_exclude) {
        let key_exclude = this.fullAssociationKey(exclude);
        if (key_all === key_exclude) {
          found = true;
          break;
        }
      }
      if (!found) {
        list.push(assoc);
      }
    }
    return list;
  }

  // ===================================================================
  //                            RENDERING
  // ===================================================================

  renderControls() {
    const { geneId, geneSpecies } = this.props;
    const { compareOrthologs } = this.state;

    return (
      <ControlsContainer>
        <OrthologPicker
          checkboxValue={compareOrthologs}
          defaultStringency={STRINGENCY_HIGH}
          focusGeneId={geneId}
          focusTaxonId={geneSpecies.taxonId}
          id="go-ortho-picker"
          onChange={this.handleOrthologyChange}
          onCheckboxValueChange={this.handleCompareOrthologsChange}
        />

        <div className="form-check form-check-inline">
          <label className="form-check-label">
            <input
              checked={this.state.onlyEXP}
              className="form-check-input"
              onChange={this.handleExpAnnotations.bind(this)}
              title="When showing the GO functions for multiple orthologs, we recommend switching this on as a number of GO functions are inferred through phylogeny (see PAINT tool)"
              type="checkbox"
            />
            <b>Show functions with at least one experimental evidence</b>
          </label>
        </div>
      </ControlsContainer>
    );
  }

  renderRibbonStrips() {
    const { applyingFilters, compareOrthologs, ribbon } = this.state;
    return (
      <HorizontalScroll className="text-nowrap">
        <wc-ribbon-strips
          category-all-style="1"
          color-by="0"
          data={JSON.stringify(ribbon)}
          fire-event-on-empty-cells={false}
          group-clickable={false}
          group-open-new-tab={false}
          id="go-ribbon"
          new-tab={false}
          selection-mode="0"
          show-other-group
          subject-base-url="/gene/"
          subject-open-new-tab={false}
          subject-position={compareOrthologs ? '1' : '0'}
          update-on-subject-change={false}
        />
        <div className="ribbon-loading-overlay">{applyingFilters && <LoadingSpinner />}</div>
        <div className="text-muted mt-2">
          <i>Cell color indicative of annotation volume</i>
        </div>
      </HorizontalScroll>
    );
  }

  renderRibbonTable() {
    if (
      this.state.selected.subject &&
      this.state.selected.subject.groups[this.state.selected.group.id] &&
      this.state.onlyEXP
    ) {
      let gp = this.state.selected.subject.groups[this.state.selected.group.id];
      let keys = Object.keys(gp);
      let hasEXP = false;
      for (let key of keys) {
        if (EXP_CODES.includes(key)) {
          hasEXP = true;
        }
      }
      if (!hasEXP) {
        return '';
      }
    }

    return (
      <wc-ribbon-table
        bio-link-data={JSON.stringify(this.state.selected.data)}
        filter-by={this.state.onlyEXP ? 'evidence:' + EXP_CODES.join(',') : ''}
        group-by="term"
        // hide-columns={'qualifier,' + (this.state.selectedOrthologs.length == 0 ? 'gene,' : '') + (this.state.selected.group.id != 'all' ? ',aspect' : '')}
        hide-columns={'qualifier,gene,' + (this.state.selected.group.id !== 'all' ? ',aspect' : '')}
        order-by="term"
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderControls()}

        {this.state.error ? this.renderError() : this.renderValid()}
      </div>
    );
  }

  renderError() {
    return <NoData>No function available for that gene</NoData>;
  }

  renderValid() {
    return (
      <div>
        {this.state.loading ? <LoadingSpinner /> : this.renderRibbonStrips()}
        {this.state.selected.group ? this.state.selected.loading ? <LoadingSpinner /> : this.renderRibbonTable() : ''}
      </div>
    );
  }
}

GeneOntologyRibbon.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneSpecies: PropTypes.object,
  geneSymbol: PropTypes.string,
  navigate: PropTypes.func.isRequired,
};

/*
 * TODO: convert component to functional component utilizing useNavigate
 *
 * The wrapper component is simply a stop-gap solution since converting the component
 * is non-trivial and would stand in the way of completing the vite/react upgrade.
 * */

const GeneOntologyRibbonWithNavigate = (props) => {
  const navigate = useNavigate();
  return <GeneOntologyRibbon navigate={navigate} {...props} />;
};

GeneOntologyRibbonWithNavigate.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneSpecies: PropTypes.object,
  geneSymbol: PropTypes.string,
};

//TODO: withRouter - test
export default GeneOntologyRibbonWithNavigate;
