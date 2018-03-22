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
        <div>
        <p>Many aspects of data integration across organisms require a common set of orthology relationships among genes for the organisms represented in the Alliance of Genome Resources. This common set is needed to facilitate comparison of biological annotations and other data across the diverse organisms represented in the Alliance: human, mouse, rat, zebrafish, fly, worm, and yeast.</p>
        <p>The Alliance methodology for the identification of orthologs among human and Alliance organisms is currently built on the <ExternalLink href="http://www.flyrnai.org/diopt"> DRSC Integrative Ortholog Prediction Tool</ExternalLink>
        . DIOPT integrates a number of existing approaches including Ensembl Compara, HGNC, InParanoid, OMA, PANTHER, PhylomeDB, Roundup, TreeFam, and ZFIN, and assigns a score/count based on these different methods.</p>
        </div>
      </CollapsiblePanel>
    );
  }
}

export default OrthologyUserGuide;
