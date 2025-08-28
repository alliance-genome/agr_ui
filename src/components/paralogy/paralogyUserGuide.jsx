import ExternalLink from '../ExternalLink.jsx';

export default function ParalogyUserGuide() {
  return (
    <div>
      <p>
        Many aspects of data integration presented at the Alliance require a common set of paralogy relationships among
        genes for the organisms represented, including human. The Alliance provides the results of all methods that have
        been benchmarked by the{' '}
        <ExternalLink href="https://questfororthologs.org/">Quest for Orthologs Consortium (QfO)</ExternalLink>, as well
        as curated ortholog inferences from HGNC (for human and mouse genes), and SGD (for yeast genes).
      </p>
      <p>
        The paralog inferences from the different methods have been integrated using the DRSC Integrative Ortholog
        Prediction Tool (DIOPT). DIOPT integrates a number of existing methods including those used by the Alliance:
        Ensembl Compara, HGNC, InParanoid, OMA, OrthoFinder, OrthoInspector, PANTHER, PhylomeDB, SonicParanoid and SGD.
        See the <ExternalLink href="https://fgr.hms.harvard.edu/diopt-documentation">DIOPT documentation</ExternalLink>{' '}
        for additional information and references related to the included methods. DIOPT assigns a score/count based on
        the number of methods that call a specific paralog. For noncoding RNA genes, currently only HGNC curated
        paralogs are included.
      </p>
    </div>
  );
}
