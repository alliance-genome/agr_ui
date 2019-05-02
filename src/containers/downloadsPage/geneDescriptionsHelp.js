import React from 'react';

const GeneDescriptionsHelp = () => (
  <p>
    We provide downloadable files of the gene descriptions for each species in
    JSON, TSV and TXT formats. JSON files contain the gene descriptions along
    with metadata such as total numbers of: genes with descriptions (non-null),
    ontology terms for each data type and average number of terms per
    description. The complete JSON schema with the documented list of fields
    can be found at <a href="https://github.com/alliance-genome/agr_schemas/tree/master/genedescription">GitHub</a>.
  </p>
);

export default GeneDescriptionsHelp;
