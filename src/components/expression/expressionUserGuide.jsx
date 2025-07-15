import React from 'react';

const ExpressionUserGuide = () => (
  <div>
    <p>
      Gene expression data include temporal and/or spatial localization of transcripts and proteins in a wild-type
      background. These annotations are summarized in the Expression Ribbon. Darker cells have more annotations; white
      cells lack annotations, either because none exist or the structure does not exist in that organism. The underlying
      annotations can be viewed by clicking in a ribbon cell. Expression data from orthologs can be added to the ribbon
      and table by using the orthologous gene selector found above the ribbon. Only orthologs with annotated expression
      data are available in the OrthoPicker. Links out to the member database for these data are also provided, as well
      as, when available, links to NCBI’s GEO for high-throughput expression data for the gene.
    </p>
  </div>
);

export default ExpressionUserGuide;
