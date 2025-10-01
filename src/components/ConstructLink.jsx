import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from './dataSourceLink.jsx';

const ConstructLink = ({ construct }) => {
  return <span dangerouslySetInnerHTML={{ __html: construct.constructSymbol.displayText }} />;
};

ConstructLink.propTypes = {
  construct: PropTypes.shape({
    constructSymbol: PropTypes.shape({ displayText: String }),
    crossReferenceMap: PropTypes.shape({
      primary: PropTypes.object,
    }),
  }),
};

export default ConstructLink;
