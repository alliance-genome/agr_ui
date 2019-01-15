import React from 'react';
import PropTypes from 'prop-types';

import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../../components/attribute';
import CrossReferenceList from '../../components/crossReferenceList';

const ExpressionLinks = ({
  allExpressionCrossReference,
  geneDataProvider,
  otherExpressionCrossReferences,
  spellCrossReference,
  wildtypeExpressionCrossReference
}) => {

  // override display name to differentiate wild type and all expression
  if (wildtypeExpressionCrossReference) {
    wildtypeExpressionCrossReference.displayName = geneDataProvider + ' (wild type)';
  }
  if (allExpressionCrossReference) {
    allExpressionCrossReference.displayName = geneDataProvider + (wildtypeExpressionCrossReference ? ' (all)' : '');
  }

  const primarySources = [
    allExpressionCrossReference,
    wildtypeExpressionCrossReference,
    spellCrossReference
  ].filter(ref => ref !== undefined);

  // more than one GEO link? don't show any them.
  otherExpressionCrossReferences = otherExpressionCrossReferences.filter(ref => ref !== undefined);
  if (otherExpressionCrossReferences) {
    const linkIsGeo = link => link.displayName === 'GEO';
    if (otherExpressionCrossReferences.filter(linkIsGeo).length > 1) {
      otherExpressionCrossReferences = otherExpressionCrossReferences.filter(link => !linkIsGeo(link));
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
        {otherExpressionCrossReferences && otherExpressionCrossReferences.length &&
          <CrossReferenceList collapsible={false} crossReferences={otherExpressionCrossReferences} />
        }
      </AttributeValue>
    </AttributeList>
  );
};


ExpressionLinks.propTypes = {
  allExpressionCrossReference: PropTypes.object,
  geneDataProvider: PropTypes.string,
  otherExpressionCrossReferences: PropTypes.array,
  spellCrossReference: PropTypes.object,
  wildtypeExpressionCrossReference: PropTypes.object,
};

ExpressionLinks.defaultProps = {
};

export default ExpressionLinks;
