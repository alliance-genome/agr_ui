import React, { useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ControlsContainer from '../controlsContainer.jsx';
import { STRINGENCY_HIGH } from '../homology/constants';
import ExpressionAnnotationTable from './expressionAnnotationTable.jsx';
import HorizontalScroll from '../horizontalScroll.jsx';
import OrthologPicker from '../OrthologPicker.jsx';
import LoadingSpinner from '../loadingSpinner.jsx';
import useEventListener from '../../hooks/useEventListener';
import useComparisonRibbonQuery from '../../hooks/useComparisonRibbonQuery';
import { useNavigate } from 'react-router-dom';
import {useEffect } from "react";

const ExpressionComparisonRibbon = ({ geneId, geneTaxon }) => {
  const [compareOrthologs, setCompareOrthologs] = useState(true);
  const [selectedOrthologs, setSelectedOrthologs] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState({
    group: null,
    subject: null,
  });
  const navigate = useNavigate();

  const summary = useComparisonRibbonQuery('/api/expression/ribbon-summary', geneId, selectedOrthologs);

  const onSubjectClick = (e) => {
    // don't use the ribbon default action upon subject click
    e.detail.originalEvent.preventDefault();

    // but re-route to alliance gene page
    navigate('/gene/' + e.detail.subject.id);
  };

  const onCellClick = (e) => {
    setSelectedBlock((current) => ({
      group: current.group && current.group.id === e.detail.group.id ? null : e.detail.group,
      subject: e.detail.subjects,
    }));
  };

  const ribbonRef = useRef(null);
  useEventListener(ribbonRef, 'cellClick', onCellClick);
  useEventListener(ribbonRef, 'subjectClick', onSubjectClick);

  const handleOrthologChange = (values) => {
    setSelectedOrthologs(values);
    if (selectedBlock.group && ribbonRef.current && ribbonRef.current.selectGroup) {
      ribbonRef.current.selectGroup(selectedBlock.group.id);
    }
  };

  // we only show the GO CC category if only a yeast gene is being shown
  let updatedSummary;
  if (summary.data && selectedOrthologs) {
    const taxonIdYeast = 'NCBITaxon:559292';
    let categories = summary.data.categories || [];
    if (categories && selectedOrthologs.length === 0 && geneTaxon === taxonIdYeast) {
      categories = categories.filter((category) => !category.id.startsWith('UBERON:'));
    }

    updatedSummary = {
      ...summary.data,
      categories,
    };
  }

function convertOldToRibbonData(old) {
  if (!old || !old.categories || !old.subjects) {
    return { categories: [], subjects: [] };
  }

  // Convert categories (unchanged)
  const categories = old.categories.map(cat => ({
    id: cat.id,
    label: cat.label,
    description: cat.description,
    groups: cat.groups.map(g => ({
      id: g.id,
      label: g.label,
      description: g.description,
      type: g.type
    }))
  }));

  const subjects = old.subjects.map(sub => {
    const groups = {};

    // Only copy groups that exist in old.subjects[*].groups
    Object.entries(sub.groups).forEach(([groupId, evidenceMap]) => {
      const transformed = {};

      Object.entries(evidenceMap).forEach(([ev, cnt]) => {
        transformed[ev] = {
          nb_annotations: cnt.nb_annotations || 0,
          nb_classes: cnt.nb_classes || 0
        };
        if (cnt.terms) transformed[ev].terms = cnt.terms;
      });

      groups[groupId] = transformed; // NO placeholders
    });

    return {
      id: sub.id,
      label: sub.label,
      taxon_id: sub.taxon_id,
      taxon_label: sub.taxon_label,
      nb_classes: sub.nb_classes,
      nb_annotations: sub.nb_annotations,
      groups       // Contains ONLY real groups
    };
  });

  return { categories, subjects };
}

  function applyAGRUnavailableSlashes(ribbonData) {
  const allGroupIds = ribbonData.categories.flatMap(c =>
    c.groups.map(g => g.id)
  );

  ribbonData.subjects.forEach(sub => {
    allGroupIds.forEach(groupId => {
      const cell = sub.groups[groupId];

      if (!cell) {
        // Missing group → slash cell
        sub.groups[groupId] = {
          unavailable: true,
          nb_annotations: 0,
          nb_classes: 0
        };
        return;
      }

      // Existing group → blank or annotated
      cell.unavailable = false;
    });
  });

  return ribbonData;
  }

  const ribbonData = useMemo(() => {
    return convertOldToRibbonData(updatedSummary);
  }, [updatedSummary]);

  useEffect(() => {
    if (!ribbonRef.current || !updatedSummary) return;
    // const ribbonData = convertOldToRibbonData(updatedSummary);
    //let data = applyAGRUnavailableSlashes(ribbonData);
    ribbonRef.current.setData(ribbonData);
  }, [updatedSummary]);

  return (
    <>
      <div className="pb-4">
        <ControlsContainer>
          <OrthologPicker
            checkboxValue={compareOrthologs}
            defaultStringency={STRINGENCY_HIGH}
            focusGeneId={geneId}
            focusTaxonId={geneTaxon}
            geneHasDataTest={(info) => info.hasExpressionAnnotations}
            id="expression-ortho-picker"
            onChange={handleOrthologChange}
            onCheckboxValueChange={setCompareOrthologs}
          />
        </ControlsContainer>
      </div>

      <HorizontalScroll>
        <div className="text-nowrap" style={{ display: "flex", alignItems: "flex-start" }}>
          <div class="left-labels">
          <div className="ribbon-subject-list">
            {ribbonData.subjects.map(sub => {
              const species = shortSpeciesName(sub.taxon_label);
              return (
              <div key={sub.id} className="ribbon-subject-item">
                <a href={`/gene/${sub.id}`} target="_self">
                  {sub.label} ({species})
                </a>
              </div>
            )})}
          </div>
          </div>

          <go-annotation-ribbon-strips
            category-all-style="1"
            color-by="0"
            fire-event-on-empty-cells="false"
            group-clickable="false"
            group-open-new-tab="false"
            new-tab="false"
            ref={ribbonRef}
            selection-mode="1"
            subject-base-url="/gene/"
            subject-open-new-tab="false"
            subject-position={compareOrthologs ? '1' : '0'}
            update-on-subject-change="false"
          >
          </go-annotation-ribbon-strips>
        </div>
        <div className="ribbon-loading-overlay">{summary.isLoading && <LoadingSpinner />}</div>
        <div className="text-muted mt-2">
          <i>
            Cell color indicative of annotation volume; red slash indicates species lacks structure or developmental
            stage.
          </i>
        </div>
      </HorizontalScroll>

      {selectedBlock.group && (
        <div className="pt-4">
          <ExpressionAnnotationTable
            focusGeneId={geneId}
            focusTaxonId={geneTaxon}
            orthologGenes={selectedOrthologs}
            term={selectedBlock.group.id}
          />
        </div>
      )}
    </>
  );
};

function shortSpeciesName(taxonLabel) {
  // "Danio rerio" → "Dre"
  // "Mus musculus" → "Mmu"
  // "Rattus norvegicus" → "Rno"
  if (!taxonLabel) return "";
  return taxonLabel
    .split(" ")
    .map(w => w[0])
    .join("")
    .charAt(0).toUpperCase() +
    taxonLabel.split(" ")[1]?.slice(0,2).toLowerCase();
}

ExpressionComparisonRibbon.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string.isRequired,
};

//TODO: withRouter - test
export default ExpressionComparisonRibbon;
