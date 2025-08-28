import React from 'react';
import PropTypes from 'prop-types';
import { dataSourceType } from '../../lib/types';
import { AttributeLabel, AttributeList, AttributeValue } from '../../components/attribute';
import CrossReferenceList from '../../components/crossReferenceList.jsx';

const PhenotypeCrossRefs = ({ primary, other }) => {
  primary = primary.filter((ref) => ref !== undefined);
  other = other.filter((ref) => ref !== undefined);

  return (
    <AttributeList>
      <AttributeLabel>Primary Sources</AttributeLabel>
      <AttributeValue placeholder="None">
        {primary && primary.length && <CrossReferenceList collapsible={false} crossReferences={primary} sort={false} />}
      </AttributeValue>

      <AttributeLabel>Other Sources</AttributeLabel>
      <AttributeValue placeholder="None">
        {other && other.length && <CrossReferenceList collapsible={false} crossReferences={other} sort={false} />}
      </AttributeValue>
    </AttributeList>
  );
};

PhenotypeCrossRefs.propTypes = {
  primary: PropTypes.arrayOf(dataSourceType),
  other: PropTypes.arrayOf(dataSourceType),
};

export default PhenotypeCrossRefs;
