import React, { Component } from 'react';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

import DownloadButton from './downloadButton';
import Utils from './utils';
import PaginationPanel from './paginationPanel';

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);

  }

  handleFilterChange(filter) {
    this.props.onFilterChange(filter);
  }

  handlePageChange(page, size) {
    this.props.onPageChange(page, size);
  }

  handleSizeChange(size) {
    this.props.onSizeChange(size);
  }

  handleSortChange(fieldName, sortOrder) {
    this.props.onSortChange(fieldName, sortOrder);
  }

  render() {
    const { columns, currentPage, data, downloadUrl, perPageSize, sortName, sortOrder, totalRows } = this.props;

    const options = {
      onFilterChange: this.handleFilterChange,
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizeChange,
      sortName: sortName,
      sortOrder: sortOrder,
      onSortChange: this.handleSortChange,
      paginationPanel: PaginationPanel,
      paginationShowsTotal: Utils.renderPaginationShowsTotal,
      page: currentPage,
      sizePerPage: perPageSize,
      sizePerPageDropDown: Utils.renderSizePerPageDropDown,
      sizePerPageList: [10, 25, 100],
    };

    return (
      <div>
        <BootstrapTable
          bordered={false}
          data={data}
          fetchInfo={{dataTotalSize: totalRows}}
          options={options}
          pagination
          remote
          tableBodyClass='table-sm'
          tableHeaderClass='table-sm'
          version='4'
        >
          {
            columns.map((col, idx) =>
              <TableHeaderColumn
                dataField={col.field}
                dataFormat={col.format}
                dataSort={col.sortable}
                filter={Utils.getTextFilter(col)}
                hidden={col.hidden}
                isKey={col.isKey}
                key={idx}
                width={col.width}
              >
                {col.label}
              </TableHeaderColumn>
            )
          }
        </BootstrapTable>
        <DownloadButton downloadUrl={downloadUrl} />
      </div>
    );
  }
}

RemoteDataTable.propTypes = {
  columns: PropTypes.array,
  currentPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
  downloadUrl: PropTypes.string,
  onFilterChange: PropTypes.func,
  onPageChange: PropTypes.func,
  onSizeChange: PropTypes.func,
  onSortChange: PropTypes.func,
  perPageSize: PropTypes.number,
  sortName: PropTypes.string,
  sortOrder: PropTypes.string,
  totalRows: PropTypes.number,
};

export default RemoteDataTable;
