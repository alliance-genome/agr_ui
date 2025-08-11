import React, { useRef, useState } from 'react';
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
        <div className="text-nowrap">
          <wc-ribbon-strips
            category-all-style="1"
            color-by="0"
            data={JSON.stringify(updatedSummary)}
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
          />
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

ExpressionComparisonRibbon.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string.isRequired,
};

//TODO: withRouter - test
export default ExpressionComparisonRibbon;
