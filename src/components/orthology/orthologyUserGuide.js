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
        <p>Many aspects of data integration across organisms require a common set of orthology relationships among genes for the organisms represented in the Alliance of Genome Resources. This common set is needed to facilitate comparison of biological annotations and other data across the diverse organisms represented in the Alliance: human, mouse, rat, zebrafish, fly, worm, and yeast.</p>
        <p> (
          <ExternalLink href="http://www.flyrnai.org/diopt" />
        ). DIOPT integrates a number of existing approaches including Compara, HGNC, InParanoid, OMA, Panther, Phylome, RoundUp, TreeFam, and ZFIN, then assigns a score/count based on different methods.</p>
      </CollapsiblePanel>
    );
  }
}

export default OrthologyUserGuide;
