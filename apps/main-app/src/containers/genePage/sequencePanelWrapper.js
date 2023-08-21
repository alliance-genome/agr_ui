import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { GenericGeneSeqPanel } from 'generic-sequence-panel';
import { getSpecies } from '../../lib/utils';
import { Buffer } from 'buffer';

window.Buffer = Buffer

class SequencePanel extends Component {

  constructor(props) {
    super(props);

    this.jBrowsenclistbaseurl = getSpecies(this.props.species).jBrowsenclistbaseurl;
    this.jBrowseurltemplate   = getSpecies(this.props.species).jBrowseurltemplate;
    this.jBrowsefastaurl      = getSpecies(this.props.species).jBrowsefastaurl;
  }

  render() {
    var refseq = this.props.refseq;
    if((this.props.species === 'NCBITaxon:559292' || this.props.species === 'NCBITaxon:8355') && !this.props.refseq.startsWith('chr') && !this.props.refseq.toLowerCase().startsWith('scaffold')){
      refseq = 'chr' + refseq;
    }
    console.log(this.props);
    console.log(this.props.gene);
    console.log(this.jBrowseurltemplate);
    console.log(refseq);
    console.log(this.props.start);
    console.log(this.props.end);
    console.log(this.jBrowsenclistbaseurl);
    console.log(this.jBrowsefastaurl);
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
