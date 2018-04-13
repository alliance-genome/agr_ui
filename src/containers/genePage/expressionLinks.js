import React from 'react';
import PropTypes from 'prop-types';

import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import ExternalLink from '../../components/externalLink';
import CrossReferenceList from '../../components/crossReferenceList';

const ExpressionLinks = ({wildTypeExpressionLink, allExpressionLink, otherExpressionLinks}) => {
  const wtLink = (wildTypeExpressionLink || [])[0];
  const allLink = (allExpressionLink || [])[0];
  return (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue placeholder='None'>
        { (wtLink || allLink) && <div>
          {wtLink && <div><ExternalLink href={wtLink.crossRefCompleteUrl}>{wtLink.prefix} (wild type)</ExternalLink></div>}
          {allLink && <div><ExternalLink href={allLink.crossRefCompleteUrl}>{allLink.prefix} (all)</ExternalLink></div>}
        </div> }
      </AttributeValue>

      <AttributeLabel>Other Sources</AttributeLabel>
      <AttributeValue placeholder='None'>
        {otherExpressionLinks && <CrossReferenceList crossReferences={otherExpressionLinks} />}
      </AttributeValue>
    </AttributeList>
  );
};


ExpressionLinks.propTypes = {
  allExpressionLink: PropTypes.array,
  otherExpressionLinks: PropTypes.array,
  wildTypeExpressionLink: PropTypes.array,
};

export default ExpressionLinks;
