import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DataSourceLink extends Component {
  render() {
    return (
      <a href={this.props.reference.crossrefCompleteUrl}>{this.props.reference.id}</a>
    );
  }
}

DataSourceLink.propTypes = {
  omitPrefix: PropTypes.bool,
  reference: PropTypes.shape({
    crossrefCompleteUrl: PropTypes.string,
    id: PropTypes.string,
  }),
};

export default DataSourceLink;
