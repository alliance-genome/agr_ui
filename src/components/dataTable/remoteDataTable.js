import React, { Component } from 'react';

import {
  fetchAssociations,
  setCurrentPage,
  setPerPageSize
} from '../../actions/disease.js';

import { BootstrapTable, ExportCSVButton, TableHeaderColumn } from 'react-bootstrap-table';
import Pagination from './pagination';
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
    this.createCustomExportButton=this.createCustomExportButton.bind(this);
  }

  createCustomExportButton() {
    return (
      <ExportCSVButton
        btnText='Download TSV'
        href={'http://build.alliancegenome.org/api/disease/${this.props.id}/associations/download'}
        //onClick={(e)=>{e.preventDefault()}}
      />
    );
  }

  handleResultsPerPageChange(e){
    console.log('this.props.currentPage: ' + this.props.currentPage);

    this.props.dispatch(setPerPageSize(e.target.value));
    this.props.dispatch(setCurrentPage(0));
    this.props.dispatch(fetchAssociations(this.props.id, 0, e.target.value));
  }

  render() {
    const { columns, currentPage, data, dispatch, filename, id, perPageSize, totalPages } = this.props;

    const options = {
      exportCSVBtn: this.createCustomExportButton
    };

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
          exportCSV
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
