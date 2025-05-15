import React from 'react';
import PropTypes from 'prop-types';

import { GenericGeneSeqPanel } from 'generic-sequence-panel';
import { getSpecies } from '../../lib/utils';
import { Buffer } from 'buffer';

import { useRelease } from '../../hooks/ReleaseContextProvider.jsx';

window.Buffer = Buffer

const SequencePanel = ({species, gene, refseq, start, end}) => {

  const useGetReleaseVersion = () => {
    const release = useRelease();

    if( !release.isLoading && !release.isError ){
      return release.data.releaseVersion
    }
    else{
      return 'unknown'
    }
  }

  const contextReleaseVersion = useGetReleaseVersion()
  const releaseVersion = process.env.REACT_APP_JBROWSE_AGR_RELEASE || contextReleaseVersion
  console.info(`sequencePanelWrapper releaseVersion: ${releaseVersion}`)

  const jBrowsenclistbaseurl = getSpecies(species).jBrowsenclistbaseurltemplate.replace('{release}', releaseVersion)
  const jBrowseurltemplate   = getSpecies(species).jBrowseurltemplate;
  const jBrowsefastaurl      = getSpecies(species).jBrowsefastaurl;

  if((species === 'NCBITaxon:559292' || species === 'NCBITaxon:8355') && !refseq.startsWith('chr') && !refseq.toLowerCase().startsWith('scaffold')){
    refseq = 'chr' + refseq;
  }

  return (
    <GenericGeneSeqPanel
          refseq={refseq}
          start={start}
          end={end}
          gene={gene}
          nclistbaseurl={jBrowsenclistbaseurl}
          urltemplate={jBrowseurltemplate}
          fastaurl={jBrowsefastaurl}
    />
  );
}

SequencePanel.propTypes = {
  species: PropTypes.string,
  refseq: PropTypes.string,
  start: PropTypes.number,
  end: PropTypes.number,
  gene: PropTypes.string,
  jBrowsenclistbaseurl: PropTypes.string,
  jBrowseurltemplate: PropTypes.string,
  jBrowsefastaurl: PropTypes.string
};

export default SequencePanel;
