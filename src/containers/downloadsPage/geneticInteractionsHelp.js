import React from 'react';

import ExternalLink from '../../components/ExternalLink';


const GeneticInteractionsHelp = () => (
  <p>
    These files provide a set of annotations of genetic interactions for genes from all Alliance
    species (human, rat, mouse, zebrafish, fruit fly, nematode, and yeast). The files are in
    the <ExternalLink href="https://github.com/HUPO-PSI/miTab/blob/master/PSI-MITAB27Format.md">PSI-MI TAB 2.7 format</ExternalLink>,
    a tab-delimited format established by
    the <ExternalLink href="http://www.psidev.info/">HUPO Proteomics Standards Initiative</ExternalLink> Molecular
    Interactions (PSI-MI) working group. The interaction data are sourced from Alliance members WormBase
    and FlyBase, as well as the <ExternalLink href="https://thebiogrid.org/">BioGRID database</ExternalLink>.
    Identities or types of genetic perturbations for
    each interactor (if available) are provided in columns 26 and 27 and relevant
    phenotypes or traits (if available) are provided in column 28.
  </p>
);

export default GeneticInteractionsHelp;
