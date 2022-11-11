import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './ExternalLink';
import {dataSourceType} from '../lib/types';
import {getResourceUrl} from "./dataTable/getResourceUrl";

const DataSourceLinkCuration = ({ children, curie, type }) => {
  const url = getResourceUrl(curie, type);
  return (
    reference ? <ExternalLink href={reference && reference.crossRefCompleteUrl}>
      {children || reference.displayName || reference.name}
    </ExternalLink> : null
  );
}


export default DataSourceLinkCuration;
