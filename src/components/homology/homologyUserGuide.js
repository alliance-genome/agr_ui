import ExternalLink from '../ExternalLink';

const HomologyUserGuide = () => (
  <div>
    <p>
      Many aspects of data integration presented at the Alliance require a
      common set of orthology relationships among genes for the organisms
      represented, including human. The Alliance provides the results of
      all methods that have been benchmarked by the <ExternalLink href='https://questfororthologs.org/'>
      Quest for Orthologs Consortium (QfO)</ExternalLink>, as well as curated
      ortholog inferences from HGNC (for human and mouse genes), Xenbase (for frog genes), and
      ZFIN (relating zebrafish genes to orthologs in human, mouse, and fly).
    </p>
    <p>
      The ortholog inferences from the different methods have been
      integrated using the DRSC Integrative Ortholog Prediction Tool
      (DIOPT). DIOPT integrates a number of existing methods including
      those used by the Alliance: Ensembl Compara, HGNC, Hieranoid,
      InParanoid, OMA, OrthoFinder, OrthoInspector, PANTHER, PhylomeDB, 
      SonicParanoid, Xenbase, and ZFIN. See the <ExternalLink href='https://fgr.hms.harvard.edu/diopt-documentation'>
      DIOPT documentation</ExternalLink> for additional information and
      references related to the included methods. DIOPT assigns a
      score/count based on the number of methods that call a specific
      ortholog. For noncoding RNA genes, currently only HGNC and ZFIN
      curated orthologs are included.
    </p>
    <p>
      The DIOPT approach allows flexibility in the choice of algorithms and
      in the level of stringency applied. For the Orthology table, these
      parameters can be specified.
    </p>
  </div>
);

export default HomologyUserGuide;
