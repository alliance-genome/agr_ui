import React from 'react';

import ExternalLink from '../ExternalLink.jsx';
import { getSingleReferenceUrl } from "./utils.jsx";

const SingleReferenceCellCuration = ({ singleReference, pubModIds }) => {
  if (!singleReference) return <></>;
  const pubModId = getSingleReferencePubModId(singleReference, pubModIds);
  const { url } = getSingleReferenceUrl(pubModId);
  return <ExternalLink href={url} key={pubModId} title={pubModId}>{pubModId}</ExternalLink>;
};

const getSingleReferencePubModId = (reference, pubModIds) => {
  // for human references we have orphanet IDs coming from ExternalDatabase
  if(!reference.crossReferences) return reference.curie;
  return reference.crossReferences
    .filter(crossRef => pubModIds.includes(crossRef.referencedCurie))
    .map(crossRef => crossRef.referencedCurie)[0];
};


export default SingleReferenceCellCuration;
