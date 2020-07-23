/* eslint-disable react/no-set-state */
import React, { useEffect, useState } from 'react';
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
import { elementHasParentWithId, getGeneIdList } from '../../lib/utils';
import { useQuery } from 'react-query';
import fetchData from '../../lib/fetchData';

const RIBBON_ID = 'expression-ribbon';

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

  const summary = useQuery(
    ['expression-ribbon-summary', geneId, selectedOrthologs],
    () => {
      // selectedOrthologs is null until it is initialized by an OrthologPicker callback.
      // this prevents an unnecessary request during the first render
      if (!selectedOrthologs) {
        return;
      }
      const geneIdList = getGeneIdList(geneId, selectedOrthologs).map(id => `geneID=${id}`).join('&');
      return fetchData(`/api/expression/ribbon-summary?${geneIdList}`);
    },
    {
      staleTime: Infinity,
    }
  );

  const onSubjectClick = (e) => {
    if (elementHasParentWithId(e.target, RIBBON_ID)) {
      // don't use the ribbon default action upon subject click
      e.detail.originalEvent.preventDefault();

      // but re-route to alliance gene page
      history.push({
        pathname: '/gene/' + e.detail.subject.id
      });
    }
  };

  const onCellClick = (e) => {
    if (elementHasParentWithId(e.target, RIBBON_ID)) {
      setSelectedBlock(current => ({
        group: (current.group && current.group.id === e.detail.group.id) ? null : e.detail.group,
        subject: e.detail.subjects,
      }));
    }
  };

  useEffect(() => {
    document.addEventListener('cellClick', onCellClick);
    document.addEventListener('subjectClick', onSubjectClick);
    return () => {
      document.removeEventListener('cellClick', onCellClick);
      document.removeEventListener('subjectClick', onSubjectClick);
    };
  }, []);

  const handleOrthologChange = (values) => {
    setSelectedOrthologs(values);
    if (selectedBlock.group) {
      document.getElementById(RIBBON_ID).selectGroup(selectedBlock.group.id);
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
            id='expression-ribbon'
            new-tab={false}
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
  geneSymbol: PropTypes.string.isRequired,
  geneTaxon: PropTypes.string.isRequired,
  history: PropTypes.object,
};

export default withRouter(ExpressionComparisonRibbon);
