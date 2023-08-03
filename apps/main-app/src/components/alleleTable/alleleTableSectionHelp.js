import React from 'react';
import ExternalLink from '../ExternalLink';

const AlleleTableSectionHelp = () => (
  <div>
    <p>
      An allele is one of multiple possible forms of a functional genomic element (most
      often described as a locus or a gene), differing from the reference DNA sequence.
      The genomic element can be endogenous or constructed. The change(s) present in a
      given allele is effectively described by genomic variant(s). See a <ExternalLink href="https://twitter.com/alliancegenome/status/1379572405765570560" target="_blank"> brief tutorial</ExternalLink>.
    </p>
    <p>
      The <ExternalLink href="https://varnomen.hgvs.org/recommendations/general/" target="_blank">HGVS</ExternalLink> (Human Genome Variation Society)
      name for the Variant is linked to its location in JBrowse.
    </p>
  </div>
);

export default AlleleTableSectionHelp;
