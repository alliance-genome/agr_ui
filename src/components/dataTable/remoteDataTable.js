/* eslint-disable react/no-set-state */
import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import PropTypes from 'prop-types';

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      page: 1,

      sort: '',

      showExtra: false,
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
  }

  handlePageChange() {

  }

  handleSortChange() {

  }

  handleCountChange() {

  }

  render() {
    const options = {
      onPageChange: this.handlePageChange,
      onSortChange: this.handleSortChange,
      onSizePerPageList: this.handleCountChange,
      page: this.state.page,
      sizePerPage: 5,
      sizePerPageList: [ 10, 25, 100 ],
    };

    return (
      <BootstrapTable
        bordered={false}
        data={this.state.data}
        fetchInfo={{dataTotalSize: this.state.total}}
        options={options}
        pagination
        remote
        version='4'
      >
        {
          this.props.columns.map((col, idx) =>
            <TableHeaderColumn
              dataField={col.field}
              dataFormat={col.format}
              dataSort={col.sortable}
              hidden={col.hidden}
              isKey={col.isKey}
              key={idx}
            >
              {col.label}
            </TableHeaderColumn>
          )
        }
      </BootstrapTable>
    );
  }
}

RemoteDataTable.propTypes = {
  columns: PropTypes.array,
};

export default RemoteDataTable;
