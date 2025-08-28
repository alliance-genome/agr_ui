import React from 'react';

const DiseaseSectionHelp = () => (
  <div>
    <p>
      A grid displays the gene and its orthologs with annotations categorized using a subset of high level disease terms
      from the Disease Ontology (DO). Colored cells represent the number of annotations within a given category and
      darker colors represent more annotations. Use the checkbox to Include Negative Annotations to view cases where the
      model did not display the expected disease phenotype or a gene expected to be associated with the disease was
      experimentally shown not to be. Click a cell to populate the table below with more detailed annotations to the
      term and its subterms.
    </p>
  </div>
);

export default DiseaseSectionHelp;
