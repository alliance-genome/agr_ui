import React from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './ExternalLink.jsx';
import { buildUrlFromTemplate } from '../lib/utils.js';

const DataSourceLinkCuration = ({ children, reference }) => {
  if (!reference) return null;

  let url = reference.crossRefCompleteUrl || buildUrlFromTemplate(reference);

  if (!url) return <span>{children}</span>;

  return <ExternalLink href={url}>{children || reference.displayName || reference.referencedCurie}</ExternalLink>;
};

DataSourceLinkCuration.propTypes = {
  children: PropTypes.node,
  reference: PropTypes.shape({
    displayName: PropTypes.string,
    referencedCurie: PropTypes.string,
    crossRefCompleteUrl: PropTypes.string,
    resourceDescriptorPage: PropTypes.shape({
      name: PropTypes.string,
      urlTemplate: PropTypes.string,
    }),
  }),
};

export default DataSourceLinkCuration;
