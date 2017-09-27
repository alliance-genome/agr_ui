import React, { Component } from 'react';
import CollapsiblePanel from '../collapsiblePanel';
import ExternalLink from '../externalLink';

class OrthologyUserGuide extends Component {

  render() {
    return (
      <CollapsiblePanel
        backgroundVariants="info"
        title="Learn about how orthologs are identified"
      >
        <p>Many aspects of data integration across organisms require a common set of orthology relationships among genes for the organisms represented in the AGR. This common set is needed to facilitate comparison of biological annotations and other data across the diverse organisms represented in AGR: human, mouse, rat, zebrafish, fly, worm, and yeast.</p>
        <p>The AGR methodology for the identification of orthologs among human and AGR organisms is currently built on the DRSC Integrative Ortholog Prediction Tool (DIOPT) (
          <ExternalLink href="http://www.flyrnai.org/diopt" />
        ). DIOPT integrates a number of existing approaches: Compara, HGNC, Inparanoid, OMA, Panther, Phylome, RoundUp, TreeFam, ZFIN, and assigns a score/count based on these different methods.</p>
      </CollapsiblePanel>
    );
  }
}

export default OrthologyUserGuide;
