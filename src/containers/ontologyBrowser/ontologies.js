import { ANNOTATION_TYPES } from './annotationTypes.js';

// Root of the disease ontology ("disease"). Also identifies the root disease
// portal, whose page is an index of the portals rather than a disease page.
export const DISEASE_ROOT_CURIE = 'DOID:4';

// Supported ontologies in the browser.
//
// `source` says where terms come from:
//   'agr' — the Alliance API (/api/disease/...), which also carries annotation
//           counts and feeds the site search index.
//   'ols'  — the EBI Ontology Lookup Service. The Alliance API has no anatomy
//           endpoints yet, so the anatomy ontologies are read from OLS4. They
//           therefore have no count badges and no site-search category; term
//           search goes to OLS instead of /api/search_autocomplete.
//
// Anatomy ontologies are species-specific and deliberately not interoperable —
// WBbt, ZFA and EMAPA "intestine" are three different assertions about three
// different animals. UBERON is listed last because it is the cross-species
// bridge rather than any one member's vocabulary.
export const ONTOLOGIES = [
  {
    id: 'disease',
    label: 'Disease (DO)',
    group: 'Disease',
    source: 'agr',
    rootCurie: DISEASE_ROOT_CURIE,
    rootName: 'disease',
    curiePrefix: 'DOID',
    searchCategory: 'disease_search_result',
    annotationTypes: ANNOTATION_TYPES,
    entityPath: (curie) => `/disease/${curie}`,
    entityLabel: 'disease page',
    termUrl: (curie) => `https://www.disease-ontology.org/?id=${curie}`,
    available: true,
  },
  {
    id: 'emapa',
    label: 'Mouse Developmental Anatomy (EMAPA)',
    group: 'Anatomy',
    source: 'ols',
    olsId: 'emapa',
    entityPath: (curie) => `/anatomy/${curie}`,
    entityLabel: 'anatomy page',
    // EMAPA's declared root (EMAPA:0, "Anatomical structure") has exactly one
    // child, so starting there costs the user a click for nothing. Open on
    // "mouse", which is where MGI's own anatomy browser starts.
    rootCurie: 'EMAPA:25765',
    rootName: 'mouse',
    curiePrefix: 'EMAPA',
    species: 'Mus musculus',
    mod: 'MGI',
    termUrl: (curie) => `https://www.informatics.jax.org/vocab/gxd/anatomy/${curie}`,
    available: true,
  },
  {
    id: 'zfa',
    label: 'Zebrafish Anatomy (ZFA)',
    group: 'Anatomy',
    source: 'ols',
    olsId: 'zfa',
    entityPath: (curie) => `/anatomy/${curie}`,
    entityLabel: 'anatomy page',
    rootCurie: 'ZFA:0100000',
    rootName: 'zebrafish anatomical entity',
    curiePrefix: 'ZFA',
    species: 'Danio rerio',
    mod: 'ZFIN',
    termUrl: (curie) => `https://zfin.org/${curie}`,
    available: true,
  },
  {
    id: 'fbbt',
    label: 'Drosophila Anatomy (FBbt)',
    group: 'Anatomy',
    source: 'ols',
    olsId: 'fbbt',
    entityPath: (curie) => `/anatomy/${curie}`,
    entityLabel: 'anatomy page',
    rootCurie: 'FBbt:10000000',
    rootName: 'anatomical entity',
    curiePrefix: 'FBbt',
    species: 'Drosophila melanogaster',
    mod: 'FlyBase',
    termUrl: (curie) => `https://flybase.org/cgi-bin/cvreport.html?id=${curie}`,
    available: true,
  },
  {
    id: 'wbbt',
    label: 'C. elegans Anatomy (WBbt)',
    group: 'Anatomy',
    source: 'ols',
    olsId: 'wbbt',
    entityPath: (curie) => `/anatomy/${curie}`,
    entityLabel: 'anatomy page',
    rootCurie: 'WBbt:0000100',
    rootName: 'C. elegans anatomical entity',
    curiePrefix: 'WBbt',
    species: 'Caenorhabditis elegans',
    mod: 'WormBase',
    termUrl: (curie) => `https://www.wormbase.org/db/get?name=${curie};class=Anatomy`,
    available: true,
  },
  {
    id: 'uberon',
    label: 'Cross-species Anatomy (UBERON)',
    group: 'Anatomy',
    source: 'ols',
    olsId: 'uberon',
    rootCurie: 'UBERON:0001062',
    rootName: 'anatomical entity',
    curiePrefix: 'UBERON',
    termUrl: (curie) => `https://www.ebi.ac.uk/ols4/ontologies/uberon/classes?obo_id=${encodeURIComponent(curie)}`,
    available: true,
  },
];

export const DEFAULT_ONTOLOGY_ID = 'disease';

export const getOntology = (id) =>
  ONTOLOGIES.find((o) => o.id === id) || ONTOLOGIES.find((o) => o.id === DEFAULT_ONTOLOGY_ID);

// Ontology that owns a curie's prefix, so /anatomy/:id can work out which
// vocabulary — and therefore which species and which member — it is looking at.
// Returns undefined for a prefix no registered ontology claims.
export const getOntologyForCurie = (curie) => {
  const prefix = (curie || '').split(':')[0].toLowerCase();
  return prefix ? ONTOLOGIES.find((o) => o.curiePrefix.toLowerCase() === prefix) : undefined;
};

// Chooser groups, in registry order, so the <select> can use <optgroup>.
export const ONTOLOGY_GROUPS = ONTOLOGIES.reduce((groups, ontology) => {
  const group = groups.find((g) => g.label === ontology.group);
  if (group) {
    group.ontologies.push(ontology);
  } else {
    groups.push({ label: ontology.group, ontologies: [ontology] });
  }
  return groups;
}, []);
