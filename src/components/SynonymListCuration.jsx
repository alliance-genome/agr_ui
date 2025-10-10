import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleList } from './collapsibleList';
import { compareAlphabeticalCaseInsensitive, smartAlphaSort } from '../lib/utils';

const SynonymListCuration = ({ synonyms }) => {
  return (
    (synonyms && (
      <CollapsibleList>
        {synonyms
          .sort(smartAlphaSort((synonym) => synonym.displayText))
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
