import React, { Component } from 'react';
import {
  fetchAssociations,
  setCurrentPage,
  setPerPageSize
} from '../../actions/disease.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { PaginationList } from 'react-bootstrap-table/src/pagination/PaginationList.js';
//import { Pagination } from 'react-bootstrap-table';
// import { Pagination } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import './style.css';

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
    //this.handlePageChange=this.handlePageChange.bind(this);
    //this.renderPaginationPanel=this.renderPaginationPanel.bind(this);
    // this.test=this.test.bind(this);

  }

  handleResultsPerPageChange(e){
    this.props.dispatch(setPerPageSize(e.target.value));
    this.props.dispatch(setCurrentPage(1));
    this.props.dispatch(fetchAssociations(this.props.id, 1, e.target.value));
  }

  handlePageChange(page){
    this.props.dispatch(setCurrentPage(page));
    this.props.dispatch(fetchAssociations(this.props.id, page, this.props.perPageSize));
  }

  // test = () => {
  //   return(
  //       <div>
  //       </div>
  //   );
  // }

  render() {
    const { columns, data, filename } = this.props;

    const options = {
      paginationPanel: PaginationList,
    };

    return (
      <div>

        <BootstrapTable
          bordered={false}
          csvFileName={filename}
          data={data}
          //exportCSV
          options={options}
          // pagination
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
