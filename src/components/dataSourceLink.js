import React, {Component} from 'react';

class DataSourceLink extends Component {
  render() {
    return (
      <a href={this.props.reference.crossrefCompleteUrl}>{this.props.reference.id}</a>
    );
  }
}

DataSourceLink.propTypes = {
  omitPrefix: React.PropTypes.bool,
  reference: React.PropTypes.shape({
    crossrefCompleteUrl: React.PropTypes.string,
    id: React.PropTypes.string,
  }),
};

export default DataSourceLink;
