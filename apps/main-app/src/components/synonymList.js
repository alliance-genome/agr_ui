import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleList } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive } from '../lib/utils';

const SynonymList = ({synonyms}) => {
  return synonyms &&
    <CollapsibleList>
      {synonyms
        .sort(compareAlphabeticalCaseInsensitive())
        .map(synonym => <span dangerouslySetInnerHTML={{__html: synonym}} key={synonym} />)
      }
    </CollapsibleList>;
};

SynonymList.propTypes = {
  synonyms: PropTypes.arrayOf(PropTypes.string),
};

export default SynonymList;
