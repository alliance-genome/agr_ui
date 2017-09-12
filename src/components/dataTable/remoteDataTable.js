/* eslint-disable react/no-set-state */
import React, {Component} from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import fetchData from '../../lib/fetchData';
import PropTypes from 'prop-types';

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {do_name: 'amyotrophic lateral sclerosis', do_id: 'Homo sapiens', associatedGene: 'TARDBP', associationType: 'is implicated in', source: 'RGD', references: 'PMID:56789'},
        {do_name: 'amyotrophic lateral sclerosis', do_id: 'Rattus norvegicus', associatedGene: 'Tardbp', associationType: 'is implicated in', source: 'RGD', references: 'PMID:23456'},
        {do_name: 'amyotrophic lateral sclerosis', do_id: 'Drosophila melanogaster', associatedGene: 'Sod1', associationType: 'is implicated in', source: 'FB', references: 'PMID:12345'},
        {do_name: 'amyotrophic lateral sclerosis type 10', do_id: 'Mus musculus', associatedGene: 'Ang2', associationType: 'is implicated in', source: 'MGI', references: 'PMID:12345'},
        {do_name: 'amyotrophic lateral sclerosis type 10', do_id: 'Danio rerio', associatedGene: 'angpt2b', associationType: 'is implicated in', source: 'ZFIN', references: 'PMID:34567'},
        //{do_name: 'FTDALS1', do_id: 'Saccharomyces cerevisiae', associatedGene: 'asdf', associationType: 'is implicated in', source: 'SGD', references: {'PMID:45678', 'PMID:99891'}},

      ],
      total: 0,
      page: 1,
      order: '',
      sort: '',
      count: 6,
      showExtra: false,
    };
    this.getData = this.getData.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleCountChange = this.handleCountChange.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData(page = this.state.page, count = this.state.count, sort = this.state.sort, order = this.state.order) {
    fetchData(`${this.props.url}?_page=${page}&_limit=${count}&_sort=${sort}&_order=${order}`)
      .then(data => {
        this.setState({
          data,
          total: 72, //TODO: just a placeholder; this will need to come from the response when available
          page,
          count,
          sort,
          order });
      });
  }

  handlePageChange(page, count) {
    this.getData(page, count);
  }

  handleSortChange(name, order) {
    this.getData(this.state.page, this.state.count, name, order);
  }

  handleCountChange(count) {
    this.getData(1, count);
  }

  render() {
    const options = {
      onPageChange: this.handlePageChange,
      onSortChange: this.handleSortChange,
      onSizePerPageList: this.handleCountChange,
      page: this.state.page,
      sizePerPage: this.state.count,
      sizePerPageList: [{text: '6', value: 6}, {text: 'All', value: this.state.data.length}],
      toolbarPosition: 'bottom',
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
  url: PropTypes.string,
};

export default RemoteDataTable;
