import React from 'react';
import PropTypes from 'prop-types';

import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import CrossReferenceList from '../../components/crossReferenceList';
import DataSourceLink from '../../components/dataSourceLink';

const ExpressionLinks = ({wildTypeExpressionLink, allExpressionLink, otherExpressionLinks}) => {
  const wtLink = (wildTypeExpressionLink || [])[0];
  const allLink = (allExpressionLink || [])[0];
  const wtLabel = wtLink ? (wtLink.prefix + ' (wild type)') : '';
  const allLabel = allLink ? (allLink.prefix + (wtLink ? ' (all)' : '')) : '';
  return (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue placeholder='None'>
        { (wtLink || allLink) &&
        <div>
          <div><DataSourceLink reference={wtLink} text={wtLabel} /></div>
          <div><DataSourceLink reference={allLink} text={allLabel} /></div>
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
