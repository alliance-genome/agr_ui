import React, { Component } from 'react';
import { fetchAssociations } from '../../actions/disease.js';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';

// import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
// import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
// import Button from 'react-bootstrap/lib/Button';
// import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
// import ToggleButton from 'react-bootstrap/lib/ToggleButton';

const textSorter = (textRender, field) => {
  return (a, b, order) => {
    if (order === 'desc') {
      return textRender(a[field]).localeCompare(textRender(b[field]));
    } else {
      return textRender(b[field]).localeCompare(textRender(a[field]));
    }
  };
};

// const DownloadButton = () => {
//   return
//     <ButtonToolbar>
//       <ToggleButtonGroup defaultValue="csv" name="export" onChange={this.handleOnChange} type="radio">
//         <ToggleButton value="csv">CSV</ToggleButton>
//         <ToggleButton value="tsv">TSV</ToggleButton>
//       </ToggleButtonGroup>
//
//       <ButtonGroup style={{height:36}} >
//         <Button onClick={this.handleOnClick}>button</Button>
//       </ButtonGroup>
//     </ButtonToolbar>
// };

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
    };

    this.handleResultsPerPageChange=this.handleResultsPerPageChange.bind(this);
    this.handlePageChange=this.handlePageChange.bind(this);

  }

  handleResultsPerPageChange(e){
    this.setState({perPageSize:e.target.value});
    this.props.dispatch(fetchAssociations(this.props.id, 1, e.target.value));
  }

  handlePageChange(e){
    //e.preventDefault();
    this.setState({currentPage:e.target.value});
    //console.log(e);
    console.log(e.target.value);
    //console.log(this.props.currentPage);
    this.props.dispatch(fetchAssociations(this.props.id, e.target.value, this.state.perPageSize));

  }

  render() {

    const { columns, data, filename} = this.props;
    const options = {
      // exportCSVSeparator: '\t',
      // exportCSVText: 'Download',
      // toolbarPosition: 'bottom', //move download button to the bottom
      // paginationPosition: 'top',
      // sizePerPage: 6,
      // sizePerPageList: [ {
      //   text: '6', value: 6
      // }, {
      //   text: 'All', value: 9
      // } ],
    };

    const paginationLinks = (pages) => {
      let links = [];
      for (var i = 1; i <= pages; i++) {
        links.push(<a href='#' key={i} onClick={e => this.handlePageChange(e)} style={{paddingRight: '1%'}} value={i}>Page {i}</a>);
      }

      return (
        <div>
          {links}
        </div>
      );
    };

    return (
      <div>

        {paginationLinks(this.props.totalPages)}

        {<select
          onChange={this.handleResultsPerPageChange}
          value={this.state.perPageSize}
         >
          {[1,2,10,25,50,100].map(function(value,index){
            return <option key={index} value={value} >{value}</option>;
          })}
        </select>
        }

        {/*{this.props.currentPage} of {this.props.totalPages}*/}

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
