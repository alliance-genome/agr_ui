import React from 'react';

const GeneDescriptionsHelp = () => (
  <p>
    We provide downloadable files of the gene descriptions for each species in JSON, TSV and TXT formats. Please note
    that the template for sentences for the gene descriptions contains semicolons in between the ontology terms, and not
    commas. This is because some ontology terms contain a comma within them, so having commas within ontology terms and
    in between ontology terms affects readability of the description. JSON files contain the gene descriptions along
    with metadata such as total numbers of: genes with descriptions (non-null), ontology terms for each data type and
    average number of terms per description. The complete JSON schema with the documented list of fields can be found at{' '}
    <a href="https://github.com/alliance-genome/agr_schemas/tree/master/ingest/genedescription">GitHub</a>.
  </p>
);

export default GeneDescriptionsHelp;
