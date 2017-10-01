import React, { Component } from 'react';

import {
  fetchAssociations,
  setCurrentPage,
  setPerPageSize,
  setSort,
} from '../../actions/disease.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Download from './downloadButton.js';
import PropTypes from 'prop-types';

const textFilter = {
  type: 'TextFilter',
  delay: 100,
  placeholder: ' '
};

// TODO: this is a hack because the API JSON field names don't line up with
// the URL query param names. So we rectify them here. It might be better to
// do it as part of the column definition.
const getSortName = (fieldName) => {
  switch(fieldName) {
  case 'diseaseName':
    return 'disease';

  case 'disease_species':
    return 'species';

  case 'geneDocument':
    return 'gene';

  default:
    return 'default';
  }
};

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  handlePageChange(page, size) {
    const { currentPage, dispatch, id, sortName, sortOrder } = this.props;
    if (page !== currentPage) {
      dispatch(setCurrentPage(page));
      dispatch(fetchAssociations(id, page, size, sortName, sortOrder));
    }
  }

  handleSizeChange(size) {
    const { dispatch, id, sortName, sortOrder } = this.props;
    dispatch(setPerPageSize(size));
    dispatch(fetchAssociations(id, 1, size, sortName, sortOrder));
  }

  handleSortChange(fieldName, sortOrder) {
    const { currentPage, dispatch, id, perPageSize } = this.props;
    const sortName = getSortName(fieldName);
    dispatch(setSort(sortName, sortOrder));
    dispatch(fetchAssociations(id, currentPage, perPageSize, sortName, sortOrder));
  }

  render() {
    const { columns, currentPage, data, filename, perPageSize, totalAssociations } = this.props;

    const options = {
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizeChange,
      onSortChange: this.handleSortChange,
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
                width={col.width}
              >
                {col.label}
              </TableHeaderColumn>
            )
          }
        </BootstrapTable>

        <Download buttonText={'Download'} filename={this.props.id} id={this.props.id} />
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
  sortName: PropTypes.string,
  sortOrder: PropTypes.string,
  totalAssociations: PropTypes.number,
  totalPages: PropTypes.number,
};

export default RemoteDataTable;
