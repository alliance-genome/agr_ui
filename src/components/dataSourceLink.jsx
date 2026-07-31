import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './ExternalLink.jsx';
import { dataSourceType } from '../lib/types';

const DataSourceLink = ({ children, reference }) =>
  reference ? (
    <ExternalLink href={reference && reference.crossRefCompleteUrl}>
      {children || reference.displayName || reference.name}
    </ExternalLink>
  ) : null;

DataSourceLink.propTypes = {
  children: PropTypes.node,
  reference: dataSourceType,
};

export default DataSourceLink;
