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
    console.log(this.props.refseq);
    console.log(this.jBrowseurltemplate);
    return (
      <GenericGeneSeqPanel
            refseq={this.props.refseq}
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
