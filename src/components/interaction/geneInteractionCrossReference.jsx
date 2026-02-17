import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLinkCuration from '../dataSourceLinkCuration.jsx';
import { AttributeList, AttributeLabel, AttributeValue } from '../attribute';

export default function GeneInteractionCrossReference(props) {
  const { crossReference, geneDataProvider } = props;

  return crossReference ? (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue>
        <DataSourceLinkCuration reference={crossReference}>
          {geneDataProvider}
        </DataSourceLinkCuration>
      </AttributeValue>
    </AttributeList>
  ) : null;
}

GeneInteractionCrossReference.propTypes = {
  crossReference: PropTypes.any,
  geneDataProvider: PropTypes.any,
};
