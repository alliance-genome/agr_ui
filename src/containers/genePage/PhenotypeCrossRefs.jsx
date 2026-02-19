import React from 'react';
import PropTypes from 'prop-types';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import CrossReferenceListCuration from '../../components/CrossReferenceListCuration.jsx';

const PhenotypeCrossRefs = ({ crossReferenceMap, geneDataProvider }) => {
  const primary = [];
  const other = [];

  if (crossReferenceMap.phenotypes) {
    primary.push({ ...crossReferenceMap.phenotypes, displayName: geneDataProvider || crossReferenceMap.phenotypes.displayName });
  }

  if (crossReferenceMap.biogridOrcs) {
    other.push({ ...crossReferenceMap.biogridOrcs, displayName: 'BioGRID CRISPR Screen Cell Line Phenotypes' });
  }

  if (crossReferenceMap.phenotypesImpc) {
    other.push({ ...crossReferenceMap.phenotypesImpc, displayName: 'IMPC' });
  }

  return (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue placeholder="None">
        {primary.length > 0 && (
          <CrossReferenceListCuration collapsible={false} crossReferences={primary} sort={false} />
        )}
      </AttributeValue>

      <AttributeLabel>Other Sources</AttributeLabel>
      <AttributeValue placeholder="None">
        {other.length > 0 && (
          <CrossReferenceListCuration collapsible={false} crossReferences={other} sort={false} />
        )}
      </AttributeValue>
    </AttributeList>
  );
};

PhenotypeCrossRefs.propTypes = {
  crossReferenceMap: PropTypes.object,
  geneDataProvider: PropTypes.string,
};

export default PhenotypeCrossRefs;
