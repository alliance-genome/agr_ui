import React from 'react';

import ExternalLink from '../ExternalLink';
import { CollapsibleList } from '../collapsibleList';
import { getMultipleReferencesCuriesAndUrls } from "./utils";

const ReferencesCellCuration = (refs) => {
  const refStringsAndUrls = getMultipleReferencesCuriesAndUrls(refs);
  return refs &&
    <CollapsibleList>
      {
        refStringsAndUrls.map(({ curie, url }) => {
          return <ExternalLink href={url} key={curie} title={curie}>{curie}</ExternalLink>;
        })
      }
    </CollapsibleList>;
};

export default ReferencesCellCuration;
