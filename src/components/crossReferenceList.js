import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from './dataSourceLink';
import { CollapsibleList } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive } from '../lib/utils';

const CrossReferenceList = ({collapsible, crossReferences, sort}) => {
  const byName = compareAlphabeticalCaseInsensitive(xref => (xref.displayName || xref.name));
  const byWithLinkThenName = (a, b) => {
    if (a.url && !b.url) {
      return -1;
    }
    if (!a.url && b.url) {
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
      {
        crossReferences.map(ref => <DataSourceLink key={ref.displayName + ref.name + ref.url} reference={ref} />)
      }
    </CollapsibleList>
  );
};

CrossReferenceList.propTypes = {
  collapsible: PropTypes.bool,
  crossReferences: PropTypes.array,
  sort: PropTypes.bool,
};

CrossReferenceList.defaultProps = {
  collapsible: true,
  sort: true,
};

export default CrossReferenceList;
