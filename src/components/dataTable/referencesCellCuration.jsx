import React from 'react';

import ExternalLink from '../ExternalLink.jsx';
import { CollapsibleList } from '../collapsibleList';
import { buildUrlFromTemplate } from '../../lib/utils.js';

const removeDuplicates = (refs) => {
  const newArray = refs.map((ref) => [ref.referencedCurie, ref]);
  const newMap = new Map(newArray);
  const iterator = newMap.values();
  const uniqueRefs = [...iterator];

  return uniqueRefs;
};

const ReferencesCellCuration = ({ pubmedPublications }) => {
  if (!pubmedPublications || !pubmedPublications.length) return null;

  const refStringsAndUrls = pubmedPublications.map((publication) => ({
    referencedCurie: publication.referencedCurie,
    url: buildUrlFromTemplate(publication),
  }));
  const uniqueRefs = removeDuplicates(refStringsAndUrls);

  return (
    <CollapsibleList>
      {uniqueRefs.map(({ referencedCurie, url }) => (
        <ExternalLink href={url} key={referencedCurie} title={referencedCurie}>
          {referencedCurie}
        </ExternalLink>
      ))}
    </CollapsibleList>
  );
};

export default ReferencesCellCuration;
