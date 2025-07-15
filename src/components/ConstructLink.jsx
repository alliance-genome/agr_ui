import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from './dataSourceLink.jsx';

const ConstructLink = ({ construct }) => {
  return (
    <DataSourceLink reference={construct.crossReferenceMap?.primary}>
      <span dangerouslySetInnerHTML={{ __html: construct.name }} />
    </DataSourceLink>
  );
};

ConstructLink.propTypes = {
  construct: PropTypes.shape({
    name: PropTypes.string,
    crossReferenceMap: PropTypes.shape({
      primary: PropTypes.object,
    }),
  }),
};

export default ConstructLink;
