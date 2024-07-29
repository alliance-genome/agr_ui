import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { GenericGeneSeqPanel } from 'generic-sequence-panel';
import { getSpecies, getReleaseVersion } from '../../lib/utils';
import { Buffer } from 'buffer';

window.Buffer = Buffer

const releaseVersion = process.env.REACT_APP_JBROWSE_AGR_RELEASE || await getReleaseVersion()
console.info(`sequencePanelWrapper releaseVersion: ${releaseVersion}`)

class SequencePanel extends Component {

  constructor(props) {
    super(props);

    const jBrowsenclistbaseurl = getSpecies(this.props.species).jBrowsenclistbaseurltemplate.replace('{release}', releaseVersion)

    this.jBrowsenclistbaseurl = jBrowsenclistbaseurl;
    this.jBrowseurltemplate   = getSpecies(this.props.species).jBrowseurltemplate;
    this.jBrowsefastaurl      = getSpecies(this.props.species).jBrowsefastaurl;
  }

  render() {
    var refseq = this.props.refseq;
    if((this.props.species === 'NCBITaxon:559292' || this.props.species === 'NCBITaxon:8355') && !this.props.refseq.startsWith('chr') && !this.props.refseq.toLowerCase().startsWith('scaffold')){
      refseq = 'chr' + refseq;
    }
    return (
      <GenericGeneSeqPanel
            refseq={refseq}
            start={this.props.start}
            end={this.props.end}
            gene={this.props.gene}
            nclistbaseurl={this.jBrowsenclistbaseurl}
            urltemplate={this.jBrowseurltemplate}
            fastaurl={this.jBrowsefastaurl} 
      />
    );
  }
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
