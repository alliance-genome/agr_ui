/* eslint-disable react/no-set-state */
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import DownloadButton from './downloadButton';
import Utils from './utils';
import * as analytics from '../../lib/analytics';
import PaginationPanel from './paginationPanel';
import NoData from '../noData';
import { DEFAULT_TABLE_STATE } from '../../constants';
import LoadingOverlay from './loadingOverlay';

class RemoteDataTable extends Component {
  constructor(props) {
    super(props);

    this.state = DEFAULT_TABLE_STATE;
    this.columnRefs = new Map();

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleSortChange = this.handleSortChange.bind(this);
  }

  componentDidMount() {
    this.props.onUpdate(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.state, prevState)) {
      this.props.onUpdate(this.state);
    }
  }

  setColumnRef(key, ref) {
    this.columnRefs.set(key, ref);
  }

  handleFilterChange(filter) {
    this.setState({filters: Object.keys(filter).map(key => ({name: key, value: filter[key].value}))});
  }

  handlePageChange(page, size, title) {
    analytics.logTablePageEvent(title);
    this.setState({page});
  }

  handleSizeChange(limit) {
    analytics.logTableSizeEvent(limit);
    this.setState({limit});
  }

  handleSortChange(name, order) {
    this.setState({sort: {name, order}});
  }

  reset() {
    this.setState(DEFAULT_TABLE_STATE);
    this.columnRefs.forEach(ref => ref && ref.cleanFiltered());
  }

  render() {
    const { columns, data, downloadUrl, loading, totalRows } = this.props;
    const { page, limit, sort, filters } = this.state;

    if (!loading && !filters.length && totalRows === 0) {
      return <NoData />;
    }

    const options = {
      onFilterChange: this.handleFilterChange,
      onPageChange: this.handlePageChange,
      onSizePerPageList: this.handleSizeChange,
      sortName: sort.name,
      sortOrder: sort.order,
      onSortChange: this.handleSortChange,
      paginationPanel: PaginationPanel,
      paginationShowsTotal: Utils.renderPaginationShowsTotal,
      page: page,
      sizePerPage: limit,
      sizePerPageDropDown: Utils.renderSizePerPageDropDown,
      sizePerPageList: [10, 25, 100],
    };

    return (
      <div style={{position: 'relative'}}>
        <LoadingOverlay loading={loading} />
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
                ref={ref => this.setColumnRef(col.field, ref)}
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
  data: PropTypes.arrayOf(PropTypes.object),
  downloadUrl: PropTypes.string,
  loading: PropTypes.bool,
  onUpdate: PropTypes.func,
  totalRows: PropTypes.number,
};

export default RemoteDataTable;
