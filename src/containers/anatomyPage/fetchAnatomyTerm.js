import { fetchOlsTerm, fetchOlsParents, fetchOlsChildren } from '../../lib/ols';

// The single seam between the anatomy page and whatever serves anatomy terms.
//
// Today that is OLS4, because the Alliance API has no anatomy endpoints — see
// the anatomy page design memo. When /api/anatomy/{id} lands it will return
// term, parents and children in one document, the way /api/disease/{id} already
// does, and only this function changes; the page consumes the same
// { term, parents, children } either way.
export default async function fetchAnatomyTerm(ontology, curie) {
  const [term, parents, children] = await Promise.all([
    fetchOlsTerm(ontology.olsId, curie),
    fetchOlsParents(ontology.olsId, curie, ontology.curiePrefix),
    fetchOlsChildren(ontology.olsId, curie, ontology.curiePrefix),
  ]);
  // A curie that is well-formed but not in the ontology 404s on the term call
  // and never reaches here; this covers a 200 with an empty payload.
  if (!term) return null;
  return { term, parents, children };
}
