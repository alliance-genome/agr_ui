import React, { Component } from 'react';

import {
  fetchAssociations,
  setCurrentPage,
  setPerPageSize,
} from '../../actions/disease.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

const textSorter = (textRender, field) => {
  return (a, b, order) => {
    if (order === 'desc') {
      return textRender(a[field]).localeCompare(textRender(b[field]));
    } else {
      return textRender(b[field]).localeCompare(textRender(a[field]));
    }
  };
};

const textFilter = {
  type: 'TextFilter',
  delay: 100,
  placeholder: ' '
};

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }

  handlePageChange(page, size) {
    const { currentPage, dispatch, id } = this.props;
    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
      dispatch(fetchAssociations(id, page, size));
    }
  }

  handleSizeChange(size) {
    const { dispatch, id } = this.props;
    dispatch(setPerPageSize(size));
    dispatch(fetchAssociations(id, 1, size));
  }

  render() {
    const { columns, currentPage, data, filename, perPageSize, totalAssociations } = this.props;

    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizeChange,
      page: currentPage,
      sizePerPage: perPageSize,
      sizePerPageList: [10, 25, 100],
    };

    return (
      <div>

        <BootstrapTable
          bordered={false}
          csvFileName={filename}
          data={data}
          fetchInfo={{dataTotalSize: totalAssociations}}
          options={options}
          pagination
          remote
          version='4'
        >
          {
            columns.map((col, idx) =>
              <TableHeaderColumn
                csvFormat={col.asText}
                csvHeader={col.label}
                dataField={col.field}
                dataFormat={col.format}
                dataSort={col.sortable}
                filter={col.filterable ? textFilter : null}
                hidden={col.hidden}
                isKey={col.isKey}
                key={idx}
                sortFunc={col.asText && textSorter(col.asText, col.field)}
              >
                {col.label}
              </TableHeaderColumn>
            )
          }
        </BootstrapTable>
      </div>
    );
  }
}

RemoteDataTable.propTypes = {
  columns: PropTypes.array,
  currentPage: PropTypes.number,
  data: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
  filename: PropTypes.string,
  id: PropTypes.string,
  limit: PropTypes.number,
  perPageSize: PropTypes.number,
  totalAssociations: PropTypes.number,
  totalPages: PropTypes.number,
};

export default RemoteDataTable;
