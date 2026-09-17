import React, { useCallback, useEffect, useRef, useState } from 'react';
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
const SUBSET = 'goslim_agr';

// -- pure helpers -----------------------------------------------------------

const hasParentElementId = (elt, id) => {
  if (elt.id === id) return true;
  if (!elt.parentElement) return false;
  return hasParentElementId(elt.parentElement, id);
};

const associationKey = (assoc) => {
  if (assoc.qualifier) {
    return assoc.subject.id + '@' + assoc.object.id + '@' + assoc.negated + '@' + assoc.qualifier.join('-');
  }
  return assoc.subject.id + '@' + assoc.object.id + '@' + assoc.negated;
};

const fullAssociationKey = (assoc) =>
  associationKey(assoc) + '@' + assoc.evidence_type + '@' + assoc.provided_by + '@' + assoc.reference.join('#');

const diffAssociations = (assocsAll, assocsExclude) => {
  const list = [];
  for (const assoc of assocsAll) {
    const keyAll = fullAssociationKey(assoc);
    const found = assocsExclude.some((exclude) => fullAssociationKey(exclude) === keyAll);
    if (!found) list.push(assoc);
  }
  return list;
};

// -- component --------------------------------------------------------------

const GeneOntologyRibbon = ({ geneId, geneSpecies, geneSymbol, navigate }) => {
  const [compareOrthologs, setCompareOrthologs] = useState(false);
  const [applyingFilters, setApplyingFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedOrthologs, setSelectedOrthologs] = useState([]);
  const [onlyEXP, setOnlyEXP] = useState(false);
  const [ribbon, setRibbon] = useState(undefined);
  const [selected, setSelected] = useState({
    subject: null,
    group: null,
    data: null,
    loading: false,
    error: false,
  });

  // Preserved as constants (previously in state but never updated)
  const excludePB = true;
  const crossAspect = false;
  const filterReference = true;

  const ribbonRef = useRef(null);
  const tableRef = useRef(null);

  const stateRef = useRef({ ribbon: undefined, selected: null, selectedOrthologs: [], onlyEXP: false });
  useEffect(() => {
    stateRef.current = { ribbon, selected, selectedOrthologs, onlyEXP };
  });

  // ---------- API helpers ----------

  const ribbonOptions = () => {
    // excludeIBA is intentionally always false (see original comment)
    const excludeIBA = false;
    let exps = '';
    if (stateRef.current.onlyEXP) {
      for (const exp of EXP_CODES) exps += '&ecodes=' + exp;
    }
    return '&exclude_PB=' + excludePB + '&exclude_IBA=' + excludeIBA + '&cross_aspect=' + crossAspect + exps;
  };

  const fetchSummaryData = (subset, subjects) => {
    const subs = subjects instanceof Array ? subjects.join('&subject=') : '';
    const query = GO_API_URL + 'ontology/ribbon/?subset=' + subset + '&subject=' + subs + ribbonOptions();
    return fetchData(query);
  };

  const fetchAssociationData = (subject, group) => {
    let g = group;
    if (g === 'all') g = stateRef.current.ribbon.categories.map((elt) => elt.id);
    if (g instanceof Array) g = g.join('&slim=');
    return fetchData(GO_API_URL + 'bioentityset/slimmer/function?slim=' + g + '&subject=' + subject + '&rows=-1');
  };

  // ---------- utility functions bound to current state ----------

  const getCategory = (group) => {
    const cat = stateRef.current.ribbon.categories.filter((c) => c.groups.some((gp) => gp.id === group.id));
    return cat.length > 0 ? cat[0] : undefined;
  };

  const getCategoryIdLabel = (group) => {
    const cat = stateRef.current.ribbon.categories.filter((c) => c.groups.some((gp) => gp.id === group.id));
    return cat.length > 0 ? [cat[0].id, cat[0].label] : undefined;
  };

  const ensureFocusGeneIsPopulated = (data) => {
    const hasFocusGene = data.subjects.some((sub) => sub.id === geneId);
    const subjects = [...data.subjects];
    if (!hasFocusGene) {
      subjects.unshift({
        id: geneId,
        label: geneSymbol,
        nb_annotations: 0,
        nb_classes: 0,
        taxon_id: geneSpecies.taxonId,
        taxon_label: geneSpecies.name,
        groups: {},
      });
    }
    subjects.forEach((sub) => {
      if (!sub.groups) return;
      Object.values(sub.groups).forEach((group) => {
        if (group.available === 'false' || group.available === false) group.available = false;
        if (group.ALL?.available === 'false' || group.ALL?.available === false) group.available = false;
      });
    });
    return { ...data, subjects };
  };

  const applyTableFilters = (group, data) => {
    const filtered = JSON.parse(JSON.stringify(data));
    for (let sub = 0; sub < filtered.length; sub++) {
      if (excludePB) {
        filtered[sub].assocs = filtered[sub].assocs.filter((assoc) => assoc.object.id !== 'GO:0005515');
      }
      if (!crossAspect) {
        const aspect = getCategoryIdLabel(group);
        filtered[sub].assocs = filtered[sub].assocs.filter((assoc) => {
          const cat =
            assoc.object.category[0] === 'molecular_activity' ? 'molecular_function' : assoc.object.category[0];
          return aspect === undefined || cat === aspect[1];
        });
      }
      if (filterReference) {
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
  };

  // ---------- event handlers ----------

  const selectGroup = (subject, group) => {
    let effectiveGroup = group;
    const cur = stateRef.current.selected;
    if (cur.group && group) {
      const sameGroupID = group.id === cur.group.id;
      const sameGroupType = group.type === cur.group.type;
      const sameSubject = subject.id === cur.subject.id;
      if (sameGroupID && sameGroupType && sameSubject) effectiveGroup = undefined;
    }

    setSelected({
      subject,
      group: effectiveGroup,
      data: null,
      loading: true,
      error: false,
    });

    if (!effectiveGroup) return;

    if (effectiveGroup.type === 'Other') {
      const aspect = getCategory(effectiveGroup);
      const terms = aspect.groups.filter((elt) => elt.type === 'Term').map((elt) => elt.id);

      fetchAssociationData(subject.id, effectiveGroup.id)
        .then((dataAll) => {
          fetchAssociationData(subject.id, terms)
            .then((dataTerms) => {
              let concatAssocs = [];
              for (const arr of dataTerms) concatAssocs = concatAssocs.concat(arr.assocs);
              dataAll[0].assocs = diffAssociations(dataAll[0].assocs, concatAssocs);
              const filtered = applyTableFilters(effectiveGroup, dataAll);
              setSelected({ subject, group: effectiveGroup, data: filtered, loading: false, error: false });
            })
            .catch(() => {
              setLoading(false);
              setError(true);
            });
        })
        .catch(() => {
          setLoading(false);
          setError(true);
        });
    } else {
      fetchAssociationData(subject.id, effectiveGroup.id)
        .then((data) => {
          const filtered = applyTableFilters(effectiveGroup, data);
          setSelected({ subject, group: effectiveGroup, data: filtered, loading: false, error: false });
        })
        .catch(() => {
          setSelected({ subject: null, group: null, data: null, loading: false, error: true });
        });
    }
  };

  const onGroupClicked = useCallback((e) => {
    if (e.target.id !== 'go-ribbon') return;
    selectGroup(e.detail.subjects[0], e.detail.group);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubjectClicked = useCallback(
    (e) => {
      if (hasParentElementId(e.target, 'go-ribbon')) {
        e.detail.originalEvent.preventDefault();
        navigate('/gene/' + e.detail.subject.id);
      }
    },
    [navigate]
  );

  const handleOrthologyChange = (orthologs) => {
    setApplyingFilters(true);
    setSelectedOrthologs(orthologs);
    const geneIds = [geneId, ...orthologs.map(getOrthologId)];
    fetchSummaryData(SUBSET, geneIds)
      .then((data) => {
        const populated = ensureFocusGeneIsPopulated(data);
        setApplyingFilters(false);
        setLoading(false);
        setError(false);
        setRibbon(populated);
        const curSelected = stateRef.current.selected;
        if (curSelected.subject && !populated.subjects.some((sub) => sub.id === curSelected.subject.id)) {
          selectGroup(null, null);
        }
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  const handleCompareOrthologsChange = (val) => setCompareOrthologs(val);

  const handleExpAnnotations = (event) => {
    const newValue = event.target.checked;
    setApplyingFilters(true);
    setOnlyEXP(newValue);
    // Read the fresh onlyEXP inline via a modified ribbonOptions param — since our
    // ribbonOptions() reads from stateRef, and stateRef is updated only after
    // React re-renders, we mimic the class behavior which relied on the setState
    // callback firing after state was applied. Use the fresh value directly here.
    const excludeIBA = false;
    let exps = '';
    if (newValue) for (const exp of EXP_CODES) exps += '&ecodes=' + exp;
    const opts = '&exclude_PB=' + excludePB + '&exclude_IBA=' + excludeIBA + '&cross_aspect=' + crossAspect + exps;
    const subjects = [geneId, ...stateRef.current.selectedOrthologs.map(getOrthologId)];
    const subs = subjects.join('&subject=');
    fetchData(GO_API_URL + 'ontology/ribbon/?subset=' + SUBSET + '&subject=' + subs + opts)
      .then((data) => {
        const populated = ensureFocusGeneIsPopulated(data);
        setApplyingFilters(false);
        setLoading(false);
        setError(false);
        setRibbon(populated);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  };

  // ---------- Effects to sync web-component state ----------

  // Attach event listeners on the ribbon web-component whenever the ref
  // becomes available.
  const listenersAddedRef = useRef(false);
  useEffect(() => {
    if (!ribbonRef.current || listenersAddedRef.current) return;
    const el = ribbonRef.current;
    el.addEventListener('cellClick', onGroupClicked);
    el.addEventListener('subjectClick', onSubjectClicked);
    listenersAddedRef.current = true;
    return () => {
      if (el) {
        el.removeEventListener('cellClick', onGroupClicked);
        el.removeEventListener('subjectClick', onSubjectClicked);
      }
      listenersAddedRef.current = false;
    };
  }, [ribbon, onGroupClicked, onSubjectClicked]);

  // Push ribbon data into the web component when it arrives / changes.
  useEffect(() => {
    if (ribbon && ribbonRef.current) ribbonRef.current.setData(ribbon);
  }, [ribbon]);

  // Push selected table data into the ribbon-table web component.
  useEffect(() => {
    if (!selected.data) return;
    const timer = setTimeout(() => {
      if (tableRef.current && tableRef.current.setData) tableRef.current.setData(selected.data);
    }, 0);
    return () => clearTimeout(timer);
  }, [selected.data]);

  // ---------- render ----------

  const renderControls = () => (
    <ControlsContainer>
      <OrthologPicker
        checkboxValue={compareOrthologs}
        defaultStringency={STRINGENCY_HIGH}
        focusGeneId={geneId}
        focusTaxonId={geneSpecies.taxonId}
        id="go-ortho-picker"
        onChange={handleOrthologyChange}
        onCheckboxValueChange={handleCompareOrthologsChange}
      />

      <div className="form-check form-check-inline">
        <label className="form-check-label">
          <input
            checked={onlyEXP}
            className="form-check-input"
            onChange={handleExpAnnotations}
            title="When showing the GO functions for multiple orthologs, we recommend switching this on as a number of GO functions are inferred through phylogeny (see PAINT tool)"
            type="checkbox"
          />
          <b>Show functions with at least one experimental evidence</b>
        </label>
      </div>
    </ControlsContainer>
  );

  const renderRibbonStrips = () => (
    <HorizontalScroll className="text-nowrap">
      <go-annotation-ribbon-strips
        category-all-style="1"
        color-by="annotations"
        fire-event-on-empty-cells="false"
        group-clickable="false"
        group-open-new-tab="false"
        id="go-ribbon"
        new-tab="false"
        ref={ribbonRef}
        selection-mode="cell"
        show-other-group
        subject-base-url="/gene/"
        subject-open-new-tab="false"
        subject-position={compareOrthologs ? 'left' : 'none'}
        update-on-subject-change="false"
      />
      <div className="ribbon-loading-overlay">{applyingFilters && <LoadingSpinner />}</div>
      <div className="text-muted mt-2">
        <i>Cell color indicative of annotation volume</i>
      </div>
    </HorizontalScroll>
  );

  const renderRibbonTable = () => {
    if (selected.subject && selected.subject.groups[selected.group.id] && onlyEXP) {
      const gp = selected.subject.groups[selected.group.id];
      const hasEXP = Object.keys(gp).some((key) => EXP_CODES.includes(key));
      if (!hasEXP) return '';
    }

    return (
      <go-annotation-ribbon-table
        ref={tableRef}
        filter-by={onlyEXP ? 'evidence:' + EXP_CODES.join(',') : ''}
        group-by="term"
        hide-columns={'qualifier,gene,' + (selected.group.id !== 'all' ? ',aspect' : '')}
        order-by="term"
      />
    );
  };

  const renderError = () => <NoData>No function available for that gene</NoData>;

  const renderValid = () => (
    <div>
      {loading ? <LoadingSpinner /> : renderRibbonStrips()}
      {selected.group ? selected.loading ? <LoadingSpinner /> : renderRibbonTable() : ''}
    </div>
  );

  return (
    <div>
      {renderControls()}
      {error ? renderError() : renderValid()}
    </div>
  );
};

GeneOntologyRibbon.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneSpecies: PropTypes.object,
  geneSymbol: PropTypes.string,
  navigate: PropTypes.func.isRequired,
};

const GeneOntologyRibbonWithNavigate = (props) => {
  const navigate = useNavigate();
  return <GeneOntologyRibbon navigate={navigate} {...props} />;
};

GeneOntologyRibbonWithNavigate.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneSpecies: PropTypes.object,
  geneSymbol: PropTypes.string,
};

export default GeneOntologyRibbonWithNavigate;
