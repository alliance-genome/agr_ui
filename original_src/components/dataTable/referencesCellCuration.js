import React from 'react';

import ExternalLink from '../ExternalLink';
import { CollapsibleList } from '../collapsibleList';
import { getMultipleReferencesUrls } from "./utils";

const removeDuplicates = (refs) => {
  const newArray = refs.map((ref) => [ref.pubModId, ref]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const uniqueRefs = [...iterator];

  return uniqueRefs;
};

const ReferencesCellCuration = ({ pubModIds }) => {
  const refStringsAndUrls = getMultipleReferencesUrls(pubModIds);
  const uniqueRefs = removeDuplicates(refStringsAndUrls);

  return pubModIds &&
    <CollapsibleList>
      {
        uniqueRefs.map(({ pubModId, url }) => {
          return <ExternalLink href={url} key={pubModId} title={pubModId}>{pubModId}</ExternalLink>;
        })
      }
    </CollapsibleList>;
};

export default ReferencesCellCuration;
