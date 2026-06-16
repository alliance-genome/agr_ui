// Annotation type configuration for ontology-browser count pills.
// Each type defines a label, the endpoint suffix that returns a Long count,
// the hash anchor on the disease page, and a colour pair (background / text)
// for the pill.
export const ANNOTATION_TYPES = [
  {
    id: 'genes',
    label: 'Genes',
    endpoint: 'genes_counts',
    hash: 'associated-genes',
    bg: '#cfe2ff',
    fg: '#084298',
  },
  {
    id: 'models',
    label: 'Models',
    endpoint: 'models_counts',
    hash: 'associated-models',
    bg: '#d1e7dd',
    fg: '#0f5132',
  },
  {
    id: 'alleles',
    label: 'Alleles',
    endpoint: 'alleles_counts',
    hash: 'associated-alleles',
    bg: '#fff3cd',
    fg: '#664d03',
  },
];
