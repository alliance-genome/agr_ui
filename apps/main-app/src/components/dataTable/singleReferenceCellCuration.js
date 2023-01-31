import React from 'react';

import ExternalLink from '../ExternalLink';
import { getSingleReferenceCurieAndUrl } from "./utils";

const SingleReferenceCellCuration = (ref) => {
  const { curie, url } = getSingleReferenceCurieAndUrl(ref);
  return ref && <ExternalLink href={url} key={curie} title={curie}>{curie}</ExternalLink>;
};


export default SingleReferenceCellCuration;
