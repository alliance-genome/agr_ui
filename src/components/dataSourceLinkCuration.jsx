import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './ExternalLink.jsx';
import { buildUrlFromTemplate } from '../lib/utils.js';

const DataSourceLinkCuration = ({ children, reference }) => {
  if (!reference) return null;
  let url = buildUrlFromTemplate(reference);
  if (!url) return <span>{children}</span>;
  return <ExternalLink href={url}>{children}</ExternalLink>;
};

export default DataSourceLinkCuration;
