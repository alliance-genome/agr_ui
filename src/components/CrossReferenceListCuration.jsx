import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLinkCuration from './dataSourceLinkCuration.jsx';
import { CollapsibleList } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive } from '../lib/utils';

const CrossReferenceListCuration = ({ collapsible = true, crossReferences, gcrpCrossReference, sort = true }) => {
  const byName = compareAlphabeticalCaseInsensitive((xref) => xref.displayName || xref.referencedCurie);
  const gcrpCurie = gcrpCrossReference?.referencedCurie;
  const byWithLinkThenName = (a, b) => {
    // GCRP cross-reference always sorts first
    if (gcrpCurie) {
      if (a.referencedCurie === gcrpCurie) return -1;
      if (b.referencedCurie === gcrpCurie) return 1;
    }
    const aUrl = a.crossRefCompleteUrl || a.resourceDescriptorPage?.urlTemplate;
    const bUrl = b.crossRefCompleteUrl || b.resourceDescriptorPage?.urlTemplate;
    if (aUrl && !bUrl) {
      return -1;
    }
    if (!aUrl && bUrl) {
      return 1;
    }
    return byName(a, b);
  };

  if (!crossReferences || !crossReferences.length) {
    return null;
  }

  const size = collapsible ? undefined : crossReferences.length;

  if (sort) {
    crossReferences.sort(byWithLinkThenName);
  }

  return (
    <CollapsibleList collapsedSize={size}>
      {crossReferences.map((ref) => (
        <span key={ref.referencedCurie || ref.displayName}>
          <DataSourceLinkCuration reference={ref} />
          {gcrpCurie && ref.referencedCurie === gcrpCurie && <span> (GCRP ID)</span>}
        </span>
      ))}
    </CollapsibleList>
  );
};

CrossReferenceListCuration.propTypes = {
  collapsible: PropTypes.bool,
  crossReferences: PropTypes.array,
  sort: PropTypes.bool,
};

export default CrossReferenceListCuration;
