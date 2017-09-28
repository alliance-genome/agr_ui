import React, { Component } from 'react';

import {
  fetchAssociations,
  setCurrentPage,
  setPerPageSize
} from '../../actions/disease.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Download from './downloadButton.js';
import Pagination from './pagination.js';
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

    this.handleResultsPerPageChange=this.handleResultsPerPageChange.bind(this);
  }

  handleResultsPerPageChange(e){

    this.props.dispatch(setPerPageSize(e.target.value));
    this.props.dispatch(setCurrentPage(0));
    this.props.dispatch(fetchAssociations(this.props.id, 0, e.target.value));
  }

  render() {
    const { columns, currentPage, data, dispatch, filename, id, perPageSize, totalPages } = this.props;

    const options={};

    return (
      <div>

        <Pagination
          currentPage={currentPage}
          dispatch={dispatch}
          id={id}
          perPageSize={perPageSize}
          totalPages={totalPages}
        />

        <BootstrapTable
          bordered={false}
          csvFileName={filename}
          data={data}
          options={options}
          ref={(table) => {this.tableRef = table;}}
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

        <Download buttonText={'Download'} data={this.props.data} filename={this.props.id} id={this.props.id}/>

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
