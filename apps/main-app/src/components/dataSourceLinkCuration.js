import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './ExternalLink';
import {dataSourceType} from '../lib/types';
import {getResourceUrl} from "./dataTable/getResourceUrl";

//will be used once the data provider come
const DataSourceLinkCuration = ({ children, curie, type, subtype }) => {
  const url = getResourceUrl(curie, type, subtype);
  return (
    reference ? <ExternalLink href={reference && reference.crossRefCompleteUrl}>
      {children || reference.displayName || reference.name}
    </ExternalLink> : null
  );
}


export default DataSourceLinkCuration;
