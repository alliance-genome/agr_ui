export default function AlignmentHelp() {
  return (
    <div>
      <p>
        For the purpose of identifying alignment lengths, protein sequences were obtained from the NCBI RefSeq database
        release 207. In scenarios where multiple isoforms were available, the longest isoform was utilized. Alignments
        of the sequences were carried out via EMBOSS water software utilizing the BLOSUM62 matrix and retaining all
        default configurations.
      </p>
    </div>
  );
}
