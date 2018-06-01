import React from 'react';
import PropTypes from 'prop-types';

import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import CrossReferenceList from '../../components/crossReferenceList';

const ExpressionLinks = ({primarySources, otherSources}) => {
  // filter out undefined links
  primarySources = primarySources.filter(ref => ref !== undefined);
  otherSources = otherSources.filter(ref => ref !== undefined);

  // override display name to differentiate wild type and all expression
  const wildTypeRef = primarySources.find(ref => ref.type === 'gene/wild_type_expression');
  const allRef = primarySources.find(ref => ref.type === 'gene/expression');
  if (wildTypeRef) {
    wildTypeRef.displayName = wildTypeRef.prefix + ' (wild type)';
  }
  if (allRef) {
    allRef.displayName = allRef.prefix + (wildTypeRef ? ' (all)' : '');
  }

  // more than one GEO link? don't show any them.
  if (otherSources) {
    const linkIsGeo = link => link.displayName === 'GEO';
    if (otherSources.filter(linkIsGeo).length > 1) {
      otherSources = otherSources.filter(link => !linkIsGeo(link));
    }
  }

  return (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue placeholder='None'>
        {primarySources && primarySources.length &&
          <CrossReferenceList collapsible={false} crossReferences={primarySources} />
        }
      </AttributeValue>

      <AttributeLabel>Other Sources</AttributeLabel>
      <AttributeValue placeholder='None'>
        {otherSources && otherSources.length &&
          <CrossReferenceList collapsible={false} crossReferences={otherSources} />
        }
      </AttributeValue>
    </AttributeList>
  );
};


ExpressionLinks.propTypes = {
  otherSources: PropTypes.array,
  primarySources: PropTypes.array,
};

ExpressionLinks.defaultProps = {
  otherSources: [],
  primarySources: [],
};

export default ExpressionLinks;
