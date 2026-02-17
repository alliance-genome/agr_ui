import React from 'react';
import PropTypes from 'prop-types';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import CrossReferenceListCuration from '../../components/CrossReferenceListCuration.jsx';

const PhenotypeCrossRefs = ({ primary, other }) => {
  primary = primary.filter((ref) => ref !== undefined);
  other = other.filter((ref) => ref !== undefined);

  return (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue placeholder="None">
        {primary && primary.length > 0 && (
          <CrossReferenceListCuration collapsible={false} crossReferences={primary} sort={false} />
        )}
      </AttributeValue>

      <AttributeLabel>Other Sources</AttributeLabel>
      <AttributeValue placeholder="None">
        {other && other.length > 0 && (
          <CrossReferenceListCuration collapsible={false} crossReferences={other} sort={false} />
        )}
      </AttributeValue>
    </AttributeList>
  );
};

PhenotypeCrossRefs.propTypes = {
  primary: PropTypes.array,
  other: PropTypes.array,
};

export default PhenotypeCrossRefs;
