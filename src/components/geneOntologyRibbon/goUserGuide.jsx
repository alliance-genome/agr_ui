import React from 'react';
import ExternalLink from '../ExternalLink.jsx';

const GoUserGuide = () => (
  <div>
    <p>The <ExternalLink href='http://www.geneontology.org/'>Gene Ontology (GO)</ExternalLink> is a formal representation of biological knowledge with respect to <ExternalLink href='http://geneontology.org/docs/ontology-documentation/'>three aspects</ExternalLink> of gene product function: Molecular Function (the molecular-level activities performed by gene products), Biological Process (the larger processes, or 'biological programs' accomplished by multiple molecular activities), and Cellular Component (the locations relative to cellular structures in which a gene product performs a function). Each aspect of GO consists of classes (terms or concepts) with <ExternalLink href='http://geneontology.org/docs/ontology-relations/'>relations</ExternalLink> that link them. The relational organization of GO permits a range of concepts to be represented, from high-level, broadly descriptive terms to lower level, more specific terms. This range is useful for both annotating gene products and searching for gene product information. All GO terms contain definitions to promote their consistent and correct usage in annotation.</p>
    <p><ExternalLink href='http://geneontology.org/docs/go-annotations/'>GO annotations</ExternalLink> on gene pages are initially displayed in a summary view ("ribbon"). The ribbon lists high-level terms from each of the three aspects, with cells below each term to indicate the presence, and extent, of annotations. Colored cells indicate annotations to the high-level term or one or more of its child terms. Darker colors indicate more annotations. Mousing over a colored cell will show the number of classes and annotations associated with that term.</p>
    <p>To see a more detailed view of the annotations, click on a colored cell to open a table display. For each annotation, the table lists the GO term, Evidence (using the <ExternalLink href='http://www.evidenceontology.org/'>Evidence Code Ontology - ECO</ExternalLink>), Supporting Information ("Based on"), and a Reference. When the table is open, mouse over the colored cells to highlight the corresponding terms in the table.</p>
  </div>
);

export default GoUserGuide;
