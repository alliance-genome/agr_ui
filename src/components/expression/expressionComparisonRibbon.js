import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import ControlsContainer from '../controlsContainer';
import { STRINGENCY_HIGH } from '../orthology/constants';
import ExpressionAnnotationTable from './expressionAnnotationTable';
import HorizontalScroll from '../horizontalScroll';
import HelpPopup from '../helpPopup';
import ExpressionControlsHelp from './expressionControlsHelp';
import OrthologPicker from '../OrthologPicker';
import LoadingSpinner from '../loadingSpinner';
import { getGeneIdList } from '../../lib/utils';
import useEventListener from '../../hooks/useEventListener';
import useComparisonRibbonQuery from '../../hooks/useComparisonRibbonQuery';

const ExpressionComparisonRibbon = ({
  geneId,
  geneTaxon,
  history,
}) => {
  const [compareOrthologs, setCompareOrthologs] = useState(true);
  const [selectedOrthologs, setSelectedOrthologs] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState({
    group: null,
    subject: null,
  });

  const summary = useComparisonRibbonQuery('/api/expression/ribbon-summary', geneId, selectedOrthologs);

  const onSubjectClick = (e) => {
    // don't use the ribbon default action upon subject click
    e.detail.originalEvent.preventDefault();

    // but re-route to alliance gene page
    history.push({
      pathname: '/gene/' + e.detail.subject.id
    });
  };

  const onCellClick = (e) => {
    setSelectedBlock(current => ({
      group: (current.group && current.group.id === e.detail.group.id) ? null : e.detail.group,
      subject: e.detail.subjects,
    }));
  };

  const ribbonRef = useRef(null);
  useEventListener(ribbonRef, 'cellClick', onCellClick);
  useEventListener(ribbonRef, 'subjectClick', onSubjectClick);

  const handleOrthologChange = (values) => {
    setSelectedOrthologs(values);
    if (selectedBlock.group && ribbonRef.current) {
      ribbonRef.current.selectGroup(selectedBlock.group.id);
    }
  };

  // we only show the GO CC category if only a yeast gene is being shown
  let updatedSummary;
  if (summary.data) {
    const taxonIdYeast = 'NCBITaxon:559292';
    const categories = summary.data.categories.filter(category => !(
      selectedOrthologs.length === 0 &&
      geneTaxon === taxonIdYeast &&
      category.id.startsWith('UBERON:')
    ));

    updatedSummary = summary.data;
    updatedSummary.categories = categories;
  }

  return (
    <React.Fragment>
      <div className='pb-4'>
        <ControlsContainer>
          <span className='pull-right'>
            <HelpPopup id='expression-controls-help'>
              <ExpressionControlsHelp />
            </HelpPopup>
          </span>
          <OrthologPicker
            checkboxValue={compareOrthologs}
            defaultStringency={STRINGENCY_HIGH}
            focusGeneId={geneId}
            focusTaxonId={geneTaxon}
            geneHasDataTest={info => info.hasExpressionAnnotations}
            id='expression-ortho-picker'
            onChange={handleOrthologChange}
            onCheckboxValueChange={setCompareOrthologs}
          />
        </ControlsContainer>
      </div>

      <HorizontalScroll>
        <div className='text-nowrap'>
          <wc-ribbon-strips
            category-all-style='1'
            color-by='0'
            data={JSON.stringify(updatedSummary)}
            fire-event-on-empty-cells={false}
            group-clickable={false}
            group-open-new-tab={false}
            new-tab={false}
            ref={ribbonRef}
            selection-mode='1'
            subject-base-url='/gene/'
            subject-open-new-tab={false}
            subject-position={compareOrthologs ? '1' : '0'}
          />
        </div>
        <div className='ribbon-loading-overlay'>{summary.isLoading && <LoadingSpinner />}</div>
        <div className='text-muted mt-2'>
          <i>Cell color indicative of annotation volume; red slash indicates species lacks structure or developmental stage.</i>
        </div>
      </HorizontalScroll>

      {selectedBlock.group &&
        <div className='pt-4'>
          <ExpressionAnnotationTable genes={getGeneIdList(geneId, selectedOrthologs)} term={selectedBlock.group.id} />
        </div>
      }
    </React.Fragment>
  );
};

ExpressionComparisonRibbon.propTypes = {
  geneId: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string.isRequired,
  history: PropTypes.object,
};

export default withRouter(ExpressionComparisonRibbon);
