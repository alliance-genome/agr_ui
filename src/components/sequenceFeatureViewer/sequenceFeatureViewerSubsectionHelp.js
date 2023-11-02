import React from 'react';

const SequenceFeatureViewerSubsectionHelp = () => (
  <div>
    <p>
      The Allele/Variant Sequence Viewer shows the positions of allele-associated
      variants, where this data exists, in the context of the transcripts for the
      gene. Since the viewer is showing the genomic positions, alleles where the
      genomic location of the alteration is not known currently will not be displayed
      in the viewer. Polymorphisms determined by whole genome or whole exon sequencing
      are also not shown in this view due to the overwhelming number of these variants.
      To view these, use the link to the Alliance JBrowse below the viewer.
    </p>
  </div>
);

export default SequenceFeatureViewerSubsectionHelp;
