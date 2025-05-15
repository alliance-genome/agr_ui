import React from 'react';
import ExternalLink from '../ExternalLink.jsx';

const InteractionUserGuide = () => (
  <div>
    <p>
      Molecular interactions (e.g. protein-protein and protein-DNA
      interactions) between genes and gene products are available for
      genes from humans and all six Alliance model organism species. Alliance
      interaction data are provided by two Alliance Knowledge Centers
      (WormBase and FlyBase), as well as two external interaction
      databases, <ExternalLink href='https://thebiogrid.org'>BioGRID</ExternalLink> and
      the <ExternalLink href='https://www.imexconsortium.org'>IMEx consortium</ExternalLink>.
    </p>
    <p>
      All data presented in the table can be downloaded in tab-delimited
      format via the "Download" button beneath the table. Note that the
      downloaded file will reflect the sort and filter options implemented
      in the table.
    </p>
  </div>
);

export default InteractionUserGuide;
