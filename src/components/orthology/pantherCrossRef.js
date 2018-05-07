import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DataSourceLink from '../dataSourceLink';

class PantherCrossRef extends Component {

  render() {
    const pantherCrossRef = (this.props.crossReferences['gene/panther'] || [])[0];
    return <DataSourceLink reference={pantherCrossRef} />;
  }
}

PantherCrossRef.propTypes = {
  crossReferences: PropTypes.object,
};

export default PantherCrossRef;
