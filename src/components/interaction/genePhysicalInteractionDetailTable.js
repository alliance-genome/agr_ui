import React from 'react';
import PropTypes from 'prop-types';
import {
  LocalDataTable,
} from '../dataTable';

export default class GenePhysicalInteractionDetailTable extends React.Component {
  render() {
    const columns = [
      {
        field: 'geneB',
        label: 'Interactor gene',
        isKey: true, // TODO: remove this later
        format: (gene) => (gene.symbol),
        width: '75px',
      },
    ];
    return (
      <LocalDataTable
        columns={columns}
        data={this.props.data}
        filename={this.props.filename}
        paginated
      />
    );
  }
}

GenePhysicalInteractionDetailTable.propTypes = {
  data: PropTypes.any,
  filename: PropTypes.any,
};
