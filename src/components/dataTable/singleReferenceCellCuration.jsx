import React from 'react';

import ExternalLink from '../ExternalLink.jsx';
import { buildUrlFromTemplate } from '../../lib/utils.js';

const SingleReferenceCellCuration = ({ singleReference, pubmedPublications }) => {
  if (!singleReference) return <></>;
  const xref = getMatchingCrossReference(singleReference, pubmedPublications);
  const pubModId = xref?.referencedCurie || singleReference.curie;
  const url = xref ? buildUrlFromTemplate(xref) : null;
  return (
    <ExternalLink href={url} key={pubModId} title={pubModId}>
      {pubModId}
    </ExternalLink>
  );
};

// Match by curie against the parent row's enriched pubmedPublications (which carry
// resourceDescriptorPage.urlTemplate). For Reference-typed items, match by any of the
// reference's crossReferences[*].referencedCurie. For ExternalDatabaseReference-typed
// items (OMIM/Orphanet — no crossReferences of their own), fall back to matching by the
// reference's own curie, which is what the indexer uses as referencedCurie when it
// wraps an EDR into pubmedPublications.
const getMatchingCrossReference = (reference, pubmedPublications) => {
  if (!reference || !pubmedPublications?.length) return null;
  const candidateCuries = new Set(
    reference.crossReferences?.length ? reference.crossReferences.map((x) => x.referencedCurie) : [reference.curie]
  );
  return pubmedPublications.find((pub) => candidateCuries.has(pub.referencedCurie)) || null;
};

export default SingleReferenceCellCuration;
