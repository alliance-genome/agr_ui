// Root of the disease ontology ("disease"). Also identifies the root disease
// portal, whose page is an index of the portals rather than a disease page.
export const DISEASE_ROOT_CURIE = 'DOID:4';

// Supported ontologies in the browser.
export const ONTOLOGIES = [
  {
    id: 'disease',
    label: 'Disease (DO)',
    rootCurie: DISEASE_ROOT_CURIE,
    rootName: 'disease',
    searchCategory: 'disease_search_result',
    available: true,
  },
];

export const DEFAULT_ONTOLOGY_ID = 'disease';

export const getOntology = (id) =>
  ONTOLOGIES.find((o) => o.id === id) || ONTOLOGIES.find((o) => o.id === DEFAULT_ONTOLOGY_ID);
