import React from 'react';

import ExternalLink from '../ExternalLink';
import { getSingleReferenceCurieAndUrl } from "./utils";

const SingleReferenceCellCuration = ({singleReference}) => {
  if (singleReference) {
    const { curie, url } = getSingleReferenceCurieAndUrl(singleReference);
    return <ExternalLink href={url} key={curie} title={curie}>{curie}</ExternalLink>;
  }
  return <></>;
};


export default SingleReferenceCellCuration;
