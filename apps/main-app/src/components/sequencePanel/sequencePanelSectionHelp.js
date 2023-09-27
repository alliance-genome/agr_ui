import React from 'react';

const SequencePanelSectionHelp = () => (
  <div>
    <p>
      The set of genome features contributed by each MOD is used by this
      section to obtain the sequence of the gene and a list of transcripts.
      When a transcript is selected, Sequence Details will highlight it
      according to the scheme selected in the “Mode” menu. The options are:
    </p>
    <ul>
      <li>gene - The genomic sequence from start to end with portions that
          are UTR and coding highlighted</li>
      <li>CDS - The coding sequence of the mRNA that is the result of in
          silico splicing</li>
      <li>cDNA - The CDS with UTRs added</li>
      <li>protein - The amino acid sequence that results from the CDS in
          silico transcription</li>
      <li>genomic - The stretch of sequence from start to end with no
          special highlighting</li>
      <li>genomic +500bp up and down stream - The stretch of sequence from
          start to end with 500 base pairs of padding on both ends</li>
      <li>gene with collapsed introns - same as gene, but the introns are
          compressed to 10 base pairs at the splice junction and the remainder
          replaced with ellipses</li>
      <li>gene with 500bp up and down stream - same as “gene” but with 500bp
          of up and down stream sequence added</li>
      <li>gene with 500bp up and down stream and collapsed introns - same as
          “gene with collapsed introns” but with up and downstream padding
          added</li>
    </ul>
    <p>
      After selecting the mode, you can copy either the “plain text” of the
      sequence (that is, without any color highlighting) or copy the
      highlighted text with the provided buttons. The plain text option is
      provided for copying into web forms (such as BLAST) and text editors that
      don’t allow formatting. The copy with highlights button will allow you to
      paste into a “rich” text editor that will preserve the highlighting from
      the web page.
    </p>
  </div>
);

export default SequencePanelSectionHelp;
