import React from 'react';

import ExternalLink from '../ExternalLink';
import { CollapsibleList } from '../collapsibleList';
import { getMultipleReferencesCuriesAndUrls } from "./utils";

const removeDuplicates = (refs) => {
  const newArray = refs.map((ref) => [ref.curie, ref]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const uniqueRefs = [...iterator];

  return uniqueRefs;
}

const ReferencesCellCuration = (refs) => {
  const refStringsAndUrls = getMultipleReferencesCuriesAndUrls(refs);
	const uniqueRefs = removeDuplicates(refStringsAndUrls);

    return refs &&
    <CollapsibleList>
      {
        uniqueRefs.map(({ curie, url }) => {
          return <ExternalLink href={url} key={curie} title={curie}>{curie}</ExternalLink>;
        })
      }
    </CollapsibleList>;
};

export default ReferencesCellCuration;
