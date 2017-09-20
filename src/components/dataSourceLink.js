import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DataSourceLink extends Component {
  render() {
    return (
      <a href={this.props.reference.crossRefCompleteUrl}>{this.props.reference.name}</a>
    );
  }
}

DataSourceLink.propTypes = {
  omitPrefix: PropTypes.bool,
  reference: PropTypes.shape({
    crossRefCompleteUrl: PropTypes.string,
    name: PropTypes.string,
  }),
};

export default DataSourceLink;
