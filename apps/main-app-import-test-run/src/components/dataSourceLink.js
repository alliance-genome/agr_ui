import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './ExternalLink';
import {dataSourceType} from '../lib/types';

class DataSourceLink extends Component {
  render() {
    const {children, reference} = this.props;
    return (
      reference ? <ExternalLink href={reference && reference.url}>
        {children || reference.displayName || reference.name}
      </ExternalLink> : null
    );
  }
}

DataSourceLink.propTypes = {
  children: PropTypes.node,
  reference: dataSourceType,
};

export default DataSourceLink;
