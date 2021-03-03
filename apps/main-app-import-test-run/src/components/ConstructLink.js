import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from './dataSourceLink';

const ConstructLink = ({construct}) => {
  return (
    <DataSourceLink reference={construct.crossReferences.primary}>
      <span dangerouslySetInnerHTML={{__html: construct.name}} />
    </DataSourceLink>
  );
};

ConstructLink.propTypes = {
  construct: PropTypes.shape({
    name: PropTypes.string,
    crossReferences: PropTypes.shape({
      primary: PropTypes.object,
    }),
  })
};

export default ConstructLink;
