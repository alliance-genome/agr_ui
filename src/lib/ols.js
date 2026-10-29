import fetchData from './fetchData';

// Client for the EBI Ontology Lookup Service (OLS4).
//
// The Alliance API has no anatomy endpoints — /openapi carries disease, gene,
// allele, variant, reference and expression only — so the anatomy ontologies in
// the browser are served straight from OLS4, which publishes WBbt, ZFA, FBbt,
// EMAPA and UBERON and sends `access-control-allow-origin: *`.
//
// Everything here normalizes to the shape the Alliance disease endpoints
// already return ({ curie, name, descendantCount, definition, synonyms }) so
// the tree and detail panel do not need to care which source a term came from.

const OLS_BASE = 'https://www.ebi.ac.uk/ols4/api';

// One page is enough for a hierarchy request: the widest anatomy node in any of
// the five ontologies is UBERON's `anatomical structure` at 63 children.
const PAGE_SIZE = 500;

export const curieToIri = (curie) => `http://purl.obolibrary.org/obo/${curie.replace(':', '_')}`;

// OLS4 addresses terms by IRI, and the IRI must be percent-encoded *twice* —
// once because it is a path segment, and again because the gateway decodes it
// before the application sees it. Single-encoding 404s.
const termPath = (olsId, curie) =>
  `${OLS_BASE}/ontologies/${olsId}/terms/${encodeURIComponent(encodeURIComponent(curieToIri(curie)))}`;

const isObsolete = (term) => term?.is_obsolete === true || /^obsolete/i.test(term?.label || '');

// OLS serves every ontology with its upper-ontology and cross-ontology imports
// folded in — BFO, CL, GO and NCBITaxon terms all surface inside wbbt and fbbt.
// This is a species anatomy browser, so keep only each ontology's own terms.
const ownTerm = (prefix) => (term) =>
  !!term?.obo_id && !isObsolete(term) && term.obo_id.split(':')[0].toLowerCase() === prefix.toLowerCase();

// OBO definitions arrive as an array, and for several WBbt terms the first
// entry is a `LINKOUT::WORMATLAS::<url>` annotation rather than prose. Take the
// first entry that is an actual definition.
const pickDefinition = (description) => {
  const entries = Array.isArray(description) ? description : [description];
  return entries.find((d) => typeof d === 'string' && d.trim() && !/^LINKOUT::/i.test(d)) || undefined;
};

// OBO xrefs arrive as { database, id, description, url }, and `url` is null for
// databases OLS has no resolver for (WBPaper, VFB). Those still carry a usable
// identifier, so keep them as plain text rather than dropping them.
const normalizeXrefs = (oboXref) =>
  (oboXref || [])
    .filter((x) => x?.database && x?.id)
    .map((x) => ({
      curie: `${x.database}:${x.id}`,
      url: x.url || undefined,
    }));

const normalize = (term) => ({
  curie: term.obo_id,
  name: term.label || term.obo_id,
  xrefs: normalizeXrefs(term.obo_xref),
  // OLS reports only *whether* a term has children, never how many. The tree
  // uses descendantCount solely to decide whether to draw a chevron, so 1
  // stands in for "some" and 0 is a true leaf.
  descendantCount: term.has_children ? 1 : 0,
  definition: pickDefinition(term.description),
  synonyms: term.synonyms || [],
});

export async function fetchOlsTerm(olsId, curie, options) {
  const url = `${OLS_BASE}/ontologies/${olsId}/terms?iri=${encodeURIComponent(curieToIri(curie))}`;
  const data = await fetchData(url, options);
  const term = data?._embedded?.terms?.[0];
  return term ? normalize(term) : null;
}

// Anatomy hierarchies run through `part_of` as much as `is_a` — OLS4's plain
// `children` call returns *nothing* for WBbt:0005772 (intestine) while
// `hierarchicalChildren` returns intestinal lumen and intestinal cell. Always
// use the hierarchical variants here.
async function fetchRelated(olsId, curie, relation, prefix, options) {
  const data = await fetchData(`${termPath(olsId, curie)}/${relation}?size=${PAGE_SIZE}`, options);
  // A leaf term answers with a page of zero and no _embedded block at all.
  return (data?._embedded?.terms || []).filter(ownTerm(prefix)).map(normalize);
}

export const fetchOlsChildren = (olsId, curie, prefix, options) =>
  fetchRelated(olsId, curie, 'hierarchicalChildren', prefix, options);

export const fetchOlsParents = (olsId, curie, prefix, options) =>
  fetchRelated(olsId, curie, 'hierarchicalParents', prefix, options);

// Returns the ancestor *set*, not an ordered path — which is all the browser
// needs, since forceExpanded is a Set of curies to open.
export const fetchOlsAncestors = (olsId, curie, prefix, options) =>
  fetchRelated(olsId, curie, 'hierarchicalAncestors', prefix, options);

export async function searchOls(olsId, query, prefix, { rows = 20, signal } = {}) {
  const url =
    `${OLS_BASE}/search?q=${encodeURIComponent(query)}` +
    `&ontology=${olsId}&type=class&rows=${rows}` +
    `&fieldList=${encodeURIComponent('obo_id,label,description,has_children')}`;
  const data = await fetchData(url, { signal });
  return (data?.response?.docs || []).filter(ownTerm(prefix)).map(normalize);
}
