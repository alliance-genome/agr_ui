import React from 'react';

import ExternalLink from '../ExternalLink.jsx';
import { CollapsibleList } from '../collapsibleList';
import { getMultipleReferencesUrls } from './utils.jsx';

const removeDuplicates = (refs) => {
  const newArray = refs.map((ref) => [ref.pubModId, ref]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const uniqueRefs = [...iterator];

  return uniqueRefs;
};

const ReferencesCellCuration = ({ pubModIds }) => {
  if (!Array.isArray(pubModIds) || pubModIds.length === 0) {
    return null;
  }

  const refStringsAndUrls = getMultipleReferencesUrls(pubModIds);
  const uniqueRefs = removeDuplicates(refStringsAndUrls);

  return (
    <CollapsibleList>
      {uniqueRefs.map(({ pubModId, url }) => {
        return (
          <ExternalLink href={url} key={pubModId} title={pubModId}>
            {pubModId}
          </ExternalLink>
        );
      })}
    </CollapsibleList>
  );
};

export default ReferencesCellCuration;
