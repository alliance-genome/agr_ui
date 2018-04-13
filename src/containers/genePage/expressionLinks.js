import React from 'react';
import PropTypes from 'prop-types';

import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import DataSourceLink from '../../components/dataSourceLink';
import ExternalLink from '../../components/externalLink';

const ExpressionLinks = ({wildTypeExpressionLink, allExpressionLink, otherExpressionLinks}) => {
  const wtLink = (wildTypeExpressionLink || [])[0];
  const allLink = (allExpressionLink || [])[0];
  return (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue>
        { (wtLink || allLink) && <div>
          {wtLink && <div><ExternalLink href={wtLink.crossRefCompleteUrl}>{wtLink.prefix} (wild type)</ExternalLink></div>}
          {allLink && <div><ExternalLink href={allLink.crossRefCompleteUrl}>{allLink.prefix} (all)</ExternalLink></div>}
        </div> }
      </AttributeValue>

      <AttributeLabel>Other Sources</AttributeLabel>
      <AttributeValue placeholder='None'>
        {
          otherExpressionLinks && otherExpressionLinks.map(link => (
            <div key={link.localId}>
              <DataSourceLink reference={link} />
            </div>
          ))
        }
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
