import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from './dataSourceLink';
import { CollapsibleList } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive } from '../lib/utils';

const CrossReferenceList = ({collapsible, crossReferences}) => {
  const byName = compareAlphabeticalCaseInsensitive(xref => (xref.displayName || xref.name));
  const byWithLinkThenName = (a, b) => {
    if (a.crossRefCompleteUrl && !b.crossRefCompleteUrl) {
      return -1;
    }
    if (!a.crossRefCompleteUrl && b.crossRefCompleteUrl) {
      return 1;
    }
    return byName(a, b);
  };

  if (!crossReferences || !crossReferences.length) {
    return null;
  }

  const size = collapsible ? undefined : crossReferences.length;

  return (
    <CollapsibleList collapsedSize={size}>
      {
        crossReferences
          .sort(byWithLinkThenName)
          .map(ref => <DataSourceLink key={`${ref.localId}-${ref.crossRefType}`} reference={ref} />)
      }
    </CollapsibleList>
  );
};

CrossReferenceList.propTypes = {
  collapsible: PropTypes.bool,
  crossReferences: PropTypes.array,
};

CrossReferenceList.defaultProps = {
  collapsible: true
};

export default CrossReferenceList;
