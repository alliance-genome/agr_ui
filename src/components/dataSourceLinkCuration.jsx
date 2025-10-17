import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './ExternalLink.jsx';
import { buildUrlFromTemplate } from '../lib/utils.js';

const DataSourceLinkCuration = ({ children, reference }) => {
  let url = buildUrlFromTemplate(reference);
  return reference ? <ExternalLink href={url}>{children}</ExternalLink> : null;
};

export default DataSourceLinkCuration;
