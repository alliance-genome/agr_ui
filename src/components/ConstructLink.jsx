import React from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from './dataSourceLink.jsx';
import {buildUrlFromTemplate} from "../lib/utils.js";

const ConstructLink = ({ construct }) => {
    //let url = buildUrlFromTemplate(construct.dataProviderCrossReference);

    return (
        <span >
        <span dangerouslySetInnerHTML={{ __html: construct.constructSymbol.displayText }} >
        </span>
            </span>
  );
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
