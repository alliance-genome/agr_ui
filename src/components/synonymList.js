import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleList, CollapsibleListItem } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive } from '../lib/utils';

const SynonymList = ({synonyms}) => {
  return synonyms &&
    <CollapsibleList>
      {synonyms
        .sort(compareAlphabeticalCaseInsensitive())
        .map(synonym => (
          <CollapsibleListItem key={synonym}>
            {synonym}
          </CollapsibleListItem>
        ))}
    </CollapsibleList>;
};

SynonymList.propTypes = {
  synonym: PropTypes.arrayOf(PropTypes.string),
};

export default SynonymList;
