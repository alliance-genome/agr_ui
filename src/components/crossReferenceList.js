import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from './dataSourceLink';

const CrossReferenceList = ({crossReferences}) => {
  if (!crossReferences || !crossReferences.length) {
    return null;
  }
  return (
    <div>
      {
        crossReferences
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((ref) => {
            return (
              <div key={`ref-${ref.localId}`}>
                <DataSourceLink reference={ref} />
              </div>
            );
          })
      }
    </div>
  );
};

CrossReferenceList.propTypes = {
  crossReferences: PropTypes.array,
};

export default CrossReferenceList;
