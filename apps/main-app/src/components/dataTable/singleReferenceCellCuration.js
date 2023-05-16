import React from 'react';

import ExternalLink from '../ExternalLink';
import { getSingleReferenceCurieAndUrl } from "./utils";

const SingleReferenceCellCuration = (ref) => {
  if (ref) {
    const { curie, url } = getSingleReferenceCurieAndUrl(ref);
    return <ExternalLink href={url} key={curie} title={curie}>{curie}</ExternalLink>;
  }
  return null;
};


export default SingleReferenceCellCuration;
