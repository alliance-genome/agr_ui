import React from 'react';
import PropTypes from 'prop-types';
import { CollapsibleList } from './collapsibleList';
import { smartAlphaSort } from '../lib/utils';
import { removeDuplicates } from './dataTable/utils';

const SynonymListCuration = ({ synonyms }) => {
  const uniqueSynonyms = synonyms ? removeDuplicates(synonyms, (synonym) => synonym.displayText) : null;

  return (
    (uniqueSynonyms && (
      <CollapsibleList>
        {uniqueSynonyms.sort(smartAlphaSort((synonym) => synonym.displayText)).map((synonym) => (
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
