import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './externalLink';

class DataSourceLink extends Component {
  render() {
    const {children, reference} = this.props;
    return (
      <ExternalLink href={reference && reference.url}>
        {children || reference.displayName || reference.name}
      </ExternalLink>
    );
  }
}

DataSourceLink.propTypes = {
  children: PropTypes.node,
  reference: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    displayName: PropTypes.string,
  }),
};

export default DataSourceLink;
