/* eslint-disable react/no-set-state */
import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import fetchData from '../../lib/fetchData';
import PropTypes from 'prop-types';

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.data);
    this.state = {
      total: 0,
      // page: 1,
      // order: '',
      // sort: '',
      sizePerPage: 6,
      showExtra: false,
    };
    this.getData = this.getData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
  }

  handleSortChange(name) {
    this.getData(this.state.page, this.state.count, name);
  }

  handleCountChange(count) {
    this.getData(1, count);
  }

  render() {
    const options = {
      onPageChange: this.handlePageChange,
      onSortChange: this.handleSortChange,
      onSizePerPageList: this.handleCountChange,
      page: 1,
      sizePerPage: 1,
      sizePerPageList: [{text: '2', value: 2}, {text: 'All', value: this.props.data.length}],
      toolbarPosition: 'bottom',
    };

    return (
      <BootstrapTable
        bordered={false}
        data={this.props.data}
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
  data: PropTypes.array,
  url: PropTypes.string,
};

export default RemoteDataTable;
