import React, { Component, PropTypes } from 'react';
import { Collapse } from 'react-bootstrap';
import CollapsiblePanel from '../collapsiblePanel';

class OrthologyUserGuide extends Component {

  render() {
    return (
      <CollapsiblePanel
        backgroundVariants="info"
        title="Learn about how orthologs are identified"
      >
        <p>Many aspects of data integration across organisms require a common set of orthology relationships among genes for the organisms represented in the AGR. This common set is needed to facilitate comparison of biological annotations and other data across the diverse organisms represented in AGR: human, mouse, rat, zebrafish, fly, worm, and yeast.</p>
        <p>The AGR methodology for the identification of orthologs among human and AGR organisms is currently built on the DRSC Integrative Ortholog Prediction Tool (DIOPT) (
          <a href="http://www.flyrnai.org/diopt">http://www.flyrnai.org/diopt</a>
        ). DIOPT integrates a number of existing approaches: Compara, eggnog, HGNC, Homologene, Inparanoid, Isobase, OMA, OrthoDB, orthoMCL, Panther, Phylome, RoundUp, TreeFam, ZFIN, and assigns a score/count based on these different methods.</p>
      </CollapsiblePanel>
    );
  }
}

export default OrthologyUserGuide;
