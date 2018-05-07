import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './externalLink';

class DataSourceLink extends Component {
  render() {
    const {reference, text} = this.props;
    if (!reference) {
      return null;
    }
    return (
      <ExternalLink href={this.props.reference.crossRefCompleteUrl}>
        {text || (reference.displayName || reference.name)}
      </ExternalLink>
    );
  }
}

DataSourceLink.propTypes = {
  reference: PropTypes.shape({
    crossRefCompleteUrl: PropTypes.string,
    name: PropTypes.string,
  }),
  text: PropTypes.string,
};

export default DataSourceLink;
