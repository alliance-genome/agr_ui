/* eslint-disable react/no-set-state */
/**
 * This component will render the following child components
 * OrthologPicker, DiseaseRibbon, DiseaseAssociationTable
 * OthologPicker talks to cc and DiseaseRibbonTalks to DiseaseAssociation Table
 */
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import DiseaseAnnotationTable from './diseaseAnnotationTable';
import HorizontalScroll from '../horizontalScroll';
import { STRINGENCY_HIGH } from '../orthology/constants';
import HelpPopup from '../helpPopup';
import DiseaseControlsHelp from './diseaseControlsHelp';
import ControlsContainer from '../controlsContainer';
import LoadingSpinner from '../loadingSpinner';
import OrthologPicker from '../OrthologPicker';
import { withRouter } from 'react-router-dom';
import { getGeneIdList } from '../../lib/utils';
import { useQuery } from 'react-query';
import fetchData from '../../lib/fetchData';
import useEventListener from '../../hooks/useEventListener';

const RIBBON_ID = 'disease-ribbon';

const DiseaseComparisonRibbon = ({geneId, geneTaxon, history}) => {
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

  const summary = useQuery(
    ['disease-ribbon-summary', geneId, selectedOrthologs],
    () => {
      // selectedOrthologs is null until it is initialized by an OrthologPicker callback.
      // this prevents an unnecessary request during the first render
      if (!selectedOrthologs) {
        return;
      }
      const geneIdList = getGeneIdList(geneId, selectedOrthologs).map(id => `geneID=${id}`).join('&');
      return fetchData(`/api/gene/*/disease-ribbon-summary?${geneIdList}`);
    },
    {
      staleTime: Infinity,
    }
  );

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
    if (selectedBlock.group) {
      document.getElementById(RIBBON_ID).selectGroup(selectedBlock.group.id);
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
            id={RIBBON_ID}
            new-tab={false}
            ref={ribbonRef}
            selected='all'
            selection-mode='1'
            subject-base-url='/gene/'
            subject-open-new-tab={false}
            subject-position={compareOrthologs ? '1' : '0'}
          />
        </div>
        <div className='ribbon-loading-overlay'>{summary.isLoading && <LoadingSpinner />}</div>
        <div className='text-muted mt-2'>
          <i>Cell color indicative of annotation volume</i>
        </div>
      </HorizontalScroll>

      {selectedBlock.group && <div className='pt-4'>
        <DiseaseAnnotationTable genes={getGeneIdList(geneId, selectedOrthologs)} term={selectedBlock.group.id} />
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
