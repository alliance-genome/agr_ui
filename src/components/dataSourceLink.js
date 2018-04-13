import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ExternalLink from './externalLink';

class DataSourceLink extends Component {
  render() {
    return (
      <ExternalLink href={this.props.reference.crossRefCompleteUrl}>
        {this.props.text || this.props.reference.name}
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
