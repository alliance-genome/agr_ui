// Supported ontologies in the browser. Only entries with `available: true` are
// backed by data today; the others render a "coming soon" placeholder until
// they are indexed into Elasticsearch.
export const ONTOLOGIES = [
  {
    id: 'disease',
    label: 'Disease (DO)',
    rootCurie: 'DOID:4',
    rootName: 'disease',
    searchCategory: 'disease_search_result',
    available: true,
  },
  { id: 'go', label: 'Gene Ontology (GO)', available: false },
  { id: 'mp', label: 'Mammalian Phenotype (MP)', available: false },
  { id: 'hp', label: 'Human Phenotype (HP)', available: false },
  { id: 'wbphenotype', label: 'WormBase Phenotype', available: false },
  { id: 'anatomy', label: 'Anatomy (UBERON / MA / EMAPA)', available: false },
  { id: 'eco', label: 'Evidence and Conclusion (ECO)', available: false },
];

export const DEFAULT_ONTOLOGY_ID = 'disease';

export const getOntology = (id) =>
  ONTOLOGIES.find((o) => o.id === id) || ONTOLOGIES.find((o) => o.id === DEFAULT_ONTOLOGY_ID);
