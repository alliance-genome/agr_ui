/**
 * This component will render the following child components
 * OrthologPicker, DiseaseRibbon, DiseaseAssociationTable
 * OthologPicker talks to cc and DiseaseRibbonTalks to DiseaseAssociation Table
 */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DiseaseAnnotationTable from './diseaseAnnotationTable';
import HorizontalScroll from '../horizontalScroll';
import { STRINGENCY_HIGH } from '../homology/constants';
import HelpPopup from '../helpPopup';
import DiseaseControlsHelp from './diseaseControlsHelp';
import ControlsContainer from '../controlsContainer';
import LoadingSpinner from '../loadingSpinner';
import OrthologPicker from '../OrthologPicker';
import { withRouter } from 'react-router-dom';
import useEventListener from '../../hooks/useEventListener';
import useComparisonRibbonQuery from '../../hooks/useComparisonRibbonQuery';

const DiseaseComparisonRibbon = ({geneId, geneTaxon, history}) => {
  const [includeNotAnnotations, setIncludeNotAnnotations] = useState(false);
  const [compareOrthologs, setCompareOrthologs] = useState(true);
  const [selectedOrthologs, setSelectedOrthologs] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState({
    group: {
      id: 'all',
      type: 'GlobalAll',
    },
    subject: {
      id: geneId,
    }
  });

  const params = {};
  if (includeNotAnnotations) {
    params.includeNegation = true;
  }
  const summary = useComparisonRibbonQuery('/api/gene/*/disease-ribbon-summary', geneId, selectedOrthologs, params);

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

  const handleOrthologyChange = (selectedOrthologs) => {
    setSelectedOrthologs(selectedOrthologs);
    if (selectedBlock.group && ribbonRef.current) {
      ribbonRef.current.selectGroup(selectedBlock.group.id);
    }
  };

  return (
    <div>
      <div>
        <ControlsContainer>
          <span className='pull-right'>
            <HelpPopup id='disease-controls-help'>
              <DiseaseControlsHelp />
            </HelpPopup>
          </span>
          <OrthologPicker
            checkboxValue={compareOrthologs}
            defaultStringency={STRINGENCY_HIGH}
            focusGeneId={geneId}
            focusTaxonId={geneTaxon}
            id='disease-ortho-picker'
            onChange={handleOrthologyChange}
            onCheckboxValueChange={setCompareOrthologs}
          />

          <div className='form-check form-check-inline'>
            <label className='form-check-label mr-2'>
              <input
                checked={includeNotAnnotations}
                className='form-check-input'
                onChange={e => setIncludeNotAnnotations(e.target.checked)}
                type='checkbox'
              />
              <b>Include negative annotations</b>
            </label>
            <small className="form-text text-muted">Cases where the expected disease association was NOT found</small>
          </div>
        </ControlsContainer>
      </div>

      <HorizontalScroll>
        <div className='text-nowrap'>
          <wc-ribbon-strips
            category-all-style='1'
            color-by='0'
            data={JSON.stringify(summary.data)}
            fire-event-on-empty-cells={false}
            group-clickable={false}
            group-open-new-tab={false}
            new-tab={false}
            ref={ribbonRef}
            selected='all'
            selection-mode='1'
            subject-base-url='/gene/'
            subject-open-new-tab={false}
            subject-position={compareOrthologs ? '1' : '0'}
            update-on-subject-change={false}
          />
        </div>
        <div className='ribbon-loading-overlay'>{summary.isLoading && <LoadingSpinner />}</div>
        <div className='text-muted mt-2'>
          <i>Cell color indicative of annotation volume</i>
        </div>
      </HorizontalScroll>

      {selectedBlock.group && <div className='pt-4'>
        <DiseaseAnnotationTable
          focusGeneId={geneId}
          focusTaxonId={geneTaxon}
          includeNotAnnotations={includeNotAnnotations}
          orthologGenes={selectedOrthologs}
          term={selectedBlock.group.id}
        />
      </div>}
    </div>
  );
};

DiseaseComparisonRibbon.propTypes = {
  geneId: PropTypes.string,
  geneTaxon: PropTypes.string,
  history: PropTypes.object,
};

export default withRouter(DiseaseComparisonRibbon);
