// Supported ontologies in the browser.
export const ONTOLOGIES = [
  {
    id: 'disease',
    label: 'Disease (DO)',
    rootCurie: 'DOID:4',
    rootName: 'disease',
    searchCategory: 'disease_search_result',
    available: true,
  },
];

export const DEFAULT_ONTOLOGY_ID = 'disease';

export const getOntology = (id) =>
  ONTOLOGIES.find((o) => o.id === id) || ONTOLOGIES.find((o) => o.id === DEFAULT_ONTOLOGY_ID);
