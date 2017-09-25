import React, { Component } from 'react';
import { fetchAssociations } from '../../actions/disease.js';
//import { fetchAssociationsRequest } from '../../actions/disease.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';
import './style.css';

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

    this.state={
      perPageSize: this.props.perPageSize,
      currentPage: this.props.currentPage,
    };

    this.handleResultsPerPageChange=this.handleResultsPerPageChange.bind(this);
    //this.handlePageChange=this.handlePageChange.bind(this);

  }

  handleResultsPerPageChange(e){
    this.setState({perPageSize:e.target.value});
    this.props.dispatch(fetchAssociations(this.props.id, 1, e.target.value));
   // this.props.dispatch(fetchAssociationsRequest());
  }

  handlePageChange(page){
   // e.preventDefault();
    this.setState({currentPage:page});

    this.props.dispatch(fetchAssociations(this.props.id, page, this.props.perPageSize));
   // this.props.dispatch(fetchAssociationsRequest());
    console.log('page: ' + page);
    console.log('this.props.currentPage: ' + this.props.currentPage);
    console.log('this.state.currentPage: ' + this.state.currentPage);
  }

  render() {

    const { columns, data, filename} = this.props;
    const options = {};

    return (
      <div>

        {/*{paginationLinks(this.props.totalPages)}*/}

        <Pagination
          activePage={this.state.currentPage}
          //bsSize="medium"
          //bsClass="pagination pagination-lg"
          items={this.props.totalPages}
         // onSelect={(page) => {console.log(page)} }
          onSelect={(page) => this.handlePageChange(page)}
        />

        {<select
          onChange={this.handleResultsPerPageChange}
          value={this.state.perPageSize}
         >
          {[1,2,5,10,25,50,100].map(function(value,index){
            return <option key={index} value={value} >{value}</option>;
          })}
        </select>
        }

        <BootstrapTable
          bordered={false}
          csvFileName={filename}
          data={data}
          //exportCSV
          options={options}
          //pagination
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
