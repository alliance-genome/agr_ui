import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleList } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive } from '../lib/utils';

const SynonymList = ({synonyms}) => {
  return synonyms &&
    <CollapsibleList>
      {synonyms.sort(compareAlphabeticalCaseInsensitive())}
    </CollapsibleList>;
};

SynonymList.propTypes = {
  synonym: PropTypes.arrayOf(PropTypes.string),
};

export default SynonymList;
