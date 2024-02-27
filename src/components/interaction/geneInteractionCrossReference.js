import React from 'react';
import PropTypes from 'prop-types';
import CrossReferenceList from '../crossReferenceList';
import {
  AttributeList,
  AttributeLabel,
  AttributeValue,
} from '../attribute';

export default function GeneInteractionCrossReference(props) {
  const {
    crossReference,
    geneDataProvider,
  } = props;

  return crossReference ? (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue>
        <CrossReferenceList collapsible={false} crossReferences={[{...crossReference, displayName: geneDataProvider}]} />
      </AttributeValue>
    </AttributeList>
  ) : null;
}

GeneInteractionCrossReference.propTypes = {
  crossReference: PropTypes.any,
  geneDataProvider: PropTypes.any,
};
