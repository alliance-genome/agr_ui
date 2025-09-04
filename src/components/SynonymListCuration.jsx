import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleList } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive } from '../lib/utils';

const SynonymListCuration = ({ synonyms }) => {
  return (
    (synonyms && (
      <CollapsibleList>
        {synonyms
          .sort((a, b) => compareAlphabeticalCaseInsensitive(a.formatText, b.formatText))
          .map((synonym) => (
            <span dangerouslySetInnerHTML={{ __html: synonym.displayText }} key={synonym.formatText} />
          ))}
      </CollapsibleList>
    )) || <></>
  );
};

SynonymListCuration.propTypes = {
  synonyms: PropTypes.arrayOf(PropTypes.object),
};

export default SynonymListCuration;
