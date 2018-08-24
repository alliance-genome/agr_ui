import React from 'react';
import PropTypes from 'prop-types';

export default class GenePhysicalInteractionDetailTable extends React.Component {
  render() {
    return (
      <p>A place holder for physical interaction table</p>
//      <LocalDataTable data={this.props} />
    );
  }
}

GenePhysicalInteractionDetailTable.propTypes = {
  data: PropTypes.any,
  filename: PropTypes.any,
};
